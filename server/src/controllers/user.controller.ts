import prisma from "../client";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/password";
import generateToken from "../utils/generateToken";
import { BadRequestError } from "../errors/bad-request-error";
import { sendEmail } from './../utils/sendMail';
import { getIdFromToken } from "../utils/token";
import { NotAuthorizedError } from './../errors/not-authorized-error';
var voucher_codes = require('voucher-code-generator');
import { OrderStatus } from "@prisma/client";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json({ success: true, data: users });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!user) throw new BadRequestError("User not found");
        return res.status(200).json({ success: true, data: user });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const userRegister = async (req: Request, res: Response ) => {
    try {
        const { email, password: enteredPassword, name, phone } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (user) {
            throw new BadRequestError("User already exists");
        }

        const code = voucher_codes.generate({
            length: 6,
            charset: voucher_codes.charset("alphabetic")
        });

        const hash = await hashPassword(enteredPassword);
        const newUser = await prisma.user.create({
            data: {
                password: hash,
                email,
                name,
                verificationCode: code[0],
                phone
            }
        });

        const address = await prisma.address.create({
            data: {
                userId: newUser.id,
                address: "",
                city: "",
                state: "",
                zip: "",
                country: "",
                name: ""
            }
        });

        const basket = await prisma.basket.create({
            data: {
                userId: newUser.id
            }
        })


        const { password, createdAt, updatedAt, ...userInfo } = newUser;

        const token = generateToken(newUser);

        res.status(201).json({ success: true, data: { ...userInfo, basket, address, token }})
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password: enteredPassword } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) throw new BadRequestError('Invalid credentials');

        else if (!user.verified) throw new BadRequestError('You need to verify your account to login!');

        const passwordsMatch = await comparePassword(enteredPassword, user.password);

        if (!passwordsMatch) throw new BadRequestError('Invalid credentials');

        const { password, createdAt, updatedAt, ...userInfo } = user;

        const token = generateToken(user);

        res.status(200).json({ success: true, data: { ...userInfo, token } })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const verifyUser = async (req: Request, res: Response) => {
    try {
        const { email, verificationCode } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) throw new BadRequestError('Invalid credentials');

        if (user.verified) throw new BadRequestError('User already verified');
        
        if (user.verificationCode !== verificationCode) throw new BadRequestError('Invalid verification code');
        
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                verified: true
            }
        })

        const { password, createdAt, updatedAt, ...userInfo } = user;

        const token = generateToken(user);

        res.status(200).json({ success: true, data: { ...userInfo, token } })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, photo, phone, birthday, email } = req.body;
        const id = getIdFromToken(req);

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })        

        if (!user) throw new BadRequestError('Invalid credentials');

        try {
            await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name,
                    photo,
                    phone,
                    birthday: new Date(birthday),
                    email,
                    updatedAt: new Date()
                }
            })
        } catch (e) {
            throw new BadRequestError('Some credentials are already in use by another user!');
        }
        

        const { password, createdAt, updatedAt, ...userInfo } = user;

        const token = generateToken(user);

        res.status(200).json({ success: true, data: { ...userInfo, token } })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const updateUserPassword = async (req: Request, res: Response) => {
    try {
        const { password: enteredPassword, confirmationPassword, currentPassword } = req.body;
        const id = getIdFromToken(req);

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!user) throw new BadRequestError('Invalid credentials');

        const passwordsMatch = await comparePassword(currentPassword, user.password);

        if (!passwordsMatch) throw new BadRequestError('Invalid credentials');        

        if (enteredPassword !== confirmationPassword) throw new BadRequestError('Passwords do not match');
        
        const hash = await hashPassword(enteredPassword);
        await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                password: hash,
                updatedAt: new Date()
            }
        })

        const { password, createdAt, updatedAt, ...userInfo } = user;

        const token = generateToken(user);

        res.status(200).json({ success: true, data: { ...userInfo, token } })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;
        const id = getIdFromToken(req);
        
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!user) throw new BadRequestError('Invalid credentials');

        const passwordsMatch = await comparePassword(password, user.password);

        if (!passwordsMatch) throw new BadRequestError('Invalid credentials');        
        
        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json({ success: true })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const userForgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) throw new BadRequestError('Invalid credentials');
        
        const verificationCode = 'test';
        sendEmail(email, verificationCode,'forgotPassword');        
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                verificationCode
            }
        })

        res.status(200).json({ success: true })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const addAddress = async (req: Request, res: Response) => {
    try {
        const { address, city, state, country, zip, name } = req.body;

        const id = getIdFromToken(req);

        await prisma.address.create({
            data: {
                address,
                userId: id,
                city,
                state,
                country,
                zip,
                name
            }
        })

        res.status(200).json({ success: true })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const updateAddress = async (req: Request, res: Response) => {
    try {
        const { address, city, state, country, zip, id } = req.body;

        const userId = getIdFromToken(req);

        const addressToUpdate = await prisma.address.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!addressToUpdate) throw new BadRequestError('Address not found');

        if (addressToUpdate.userId !== userId) throw new BadRequestError('You are not authorized to update this address');

        await prisma.address.update({
            where: {
                id: Number(id)
            },
            data: {
                address,
                city,
                state,
                country,
                zip
            }
        })

        res.status(200).json({ success: true })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const userId = getIdFromToken(req);

        const addressToUpdate = await prisma.address.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!addressToUpdate) throw new BadRequestError('Address not found');

        if (addressToUpdate.userId !== userId) throw new BadRequestError('You are not authorized to delete this address');

        await prisma.address.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json({ success: true })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getAddress = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = getIdFromToken(req);

        const address = await prisma.address.findUnique({
            where: {
                id: Number(id)
            },
        })

        if (!address) throw new BadRequestError('Address not found');

        if (address.userId !== userId) throw new BadRequestError('You are not authorized to view this address');
        res.status(200).json({ success: true, data: address })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}


export const getAddresses = async (req: Request, res: Response) => {
    try {
        const id = getIdFromToken(req);

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!user) throw new BadRequestError('User not found');

        const addresses = await prisma.address.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (!addresses) throw new BadRequestError('Addresses not found');

        res.status(200).json({ success: true, data: addresses })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getVouchers = async (req: Request, res: Response) => {
    try {

        const userId = getIdFromToken(req);
        
        const vouchers = await prisma.voucher.findMany({
            where: {
                userId: Number(userId)
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (!vouchers) throw new BadRequestError('You have no vouchers');

        res.status(200).json({ success: true, data: vouchers })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getVoucher = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = getIdFromToken(req);

        const voucher = await prisma.voucher.findFirst({
            where: {
                id: Number(id),
                userId: Number(userId)
            }
        });

        if (!voucher) throw new BadRequestError('Voucher not found');

        res.status(200).json({ success: true, data: voucher })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const addRatingToRetaurantForCompletedOrder = async (req: Request, res: Response) => {
    try {
        const { rating, review } = req.body;
        const { id } = req.params;
        const userId = getIdFromToken(req);

        const order = await prisma.order.findFirst({
            where: {
                id: Number(id),
                userId: Number(userId)
            }
        })        

        if (!order) throw new BadRequestError('Order not found');

        if (order.status !== OrderStatus.completed) throw new BadRequestError('You can only rate a restaurant after the order is completed');

        const restaurant = await prisma.restaurant.findFirst({
            where: {
                id: order.restaurantId
            }
        })

        if (!restaurant) throw new BadRequestError('Restaurant not found');

        const newRating = await prisma.rating.create({
            data: {
                rating,
                review,
                restaurantId: restaurant.id,
                userId: userId,
                orderId: order.id
            }
        })

        res.status(200).json({ success: true, data: newRating })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getRatings = async (req: Request, res: Response) => {
    try {
        const id = getIdFromToken(req);

        const ratings = await prisma.rating.findMany({
            where: {
                userId: Number(id)
            }
        })

        if (!ratings) throw new BadRequestError('You have no ratings');

        res.status(200).json({ success: true, data: ratings })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getRatingsForRestaurant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const restaurant = await prisma.restaurant.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!restaurant) throw new BadRequestError('Restaurant not found');

        const ratings = await prisma.rating.findMany({
            where: {
                restaurantId: restaurant.id
            },
            include: {
                User: true
            }
        })

        res.status(200).json({ success: true, data: ratings })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await prisma.restaurant.findMany({
            include: {
                Foods: true,
                Ratings: true
            }
        })

        if (!restaurants) throw new BadRequestError('No restaurants found');

        res.status(200).json({ success: true, data: restaurants })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getRestaurantsByAddressCloseToUserAddress = async (req: Request, res: Response) => {
    try {
        const id = getIdFromToken(req);

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!user) throw new BadRequestError('User not found');

        const restaurants = await prisma.restaurant.findMany({
            where: {
                address: {
                    
                }
            },
            include: {
                Foods: true
            }
        })

        if (!restaurants) throw new BadRequestError('No restaurants found');

        res.status(200).json({ success: true, data: restaurants })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getRestaurantsByTheirFoodsCategories = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;

        const restaurants = await prisma.restaurant.findMany({
            where: {
                Foods: {
                    some: {
                        categoryId: Number(categoryId)
                    }
                }
            },
            include: {
                Foods: true,
                Ratings: true
            }
        })

        if (!restaurants) throw new BadRequestError('No restaurants found');

        res.status(200).json({ success: true, data: restaurants })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

