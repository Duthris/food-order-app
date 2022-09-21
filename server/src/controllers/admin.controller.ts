import { Request, Response } from 'express';
import prisma from '../client';
import { BadRequestError } from '../errors/bad-request-error';
import { comparePassword, hashPassword } from '../utils/password';
import generateToken from '../utils/generateToken';
var voucher_codes = require('voucher-code-generator');

export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password: enteredPassword } = req.body;

        const user = await prisma.adminUser.findUnique({
            where: {
                email
            }
        })

        if (!user) throw new BadRequestError('Invalid credentials');

        const passwordsMatch = await comparePassword(enteredPassword, user.password);

        if (!passwordsMatch) throw new BadRequestError('Invalid credentials');

        const { password, createdAt, updatedAt, ...userInfo } = user;

        const token = generateToken(user, `admin`);

        res.status(200).json({ success: true, data: { ...userInfo, token } })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const admin = await prisma.adminUser.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!admin) throw new BadRequestError('Invalid credentials');

        const { password, createdAt, updatedAt, ...adminInfo } = admin;

        res.status(200).json({ success: true, data: adminInfo })

    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const addAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password: enteredPassword } = req.body;

        const user = await prisma.adminUser.findUnique({
            where: {
                email
            }
        })

        if (user) throw new BadRequestError('User already exists');
        
        const hash = await hashPassword(enteredPassword);
        const admin = await prisma.adminUser.create({
            data: {
                email,
                password: hash,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        const { password, createdAt, updatedAt, ...userInfo } = admin;

        const token = generateToken(admin);

        res.status(200).json({ success: true, data: { ...userInfo, token } })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await prisma.adminUser.findMany();

        res.status(200).json({ success: true, data: admins });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const admin = await prisma.adminUser.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!admin) throw new BadRequestError('Admin not found');
        
        await prisma.adminUser.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json({ success: true });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const verifyRestaurant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!restaurant) throw new BadRequestError('Restaurant not found');
        const restaurantUser = await prisma.restaurantUser.findUnique({
            where: {
                id: restaurant.restaurantUserId
            }
        });
        if (!restaurantUser) throw new BadRequestError('Restaurant user not found');
        restaurantUser.verified = true;
        await prisma.restaurantUser.update({
            where: {
                id: restaurantUser.id
            },
            data: {
                verified: true
            }
        });
        return res.status(200).json({ success: true, data: { restaurantUser } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, photo } = req.body;

        const categoryExist = await prisma.category.findUnique({
            where: {
                name
            }
        })

        if (categoryExist) throw new BadRequestError('Category already exists');

        const category = await prisma.category.create({
            data: {
                name,
                photo
            }
        });
        return res.status(200).json({ success: true, data: { category } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, photo } = req.body;

        const category = await prisma.category.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!category) throw new BadRequestError('Category not found');

        const categoryExist = await prisma.category.findUnique({
            where: {
                name
            }
        })

        if (categoryExist) throw new BadRequestError('Category already exists');

        const updatedCategory = await prisma.category.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
            }
        });
        return res.status(200).json({ success: true, data: { updatedCategory } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const category = await prisma.category.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!category) throw new BadRequestError('Category not found');

        await prisma.category.delete({
            where: {
                id: Number(id)
            }
        });
        return res.status(200).json({ success: true, data: { category } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const createVoucher = async (req: Request, res: Response) => {
    try {
        const { name, description, discount, expiredAt, userId, minAmount} = req.body;

        const code = voucher_codes.generate({
            length: 5,
            charset: voucher_codes.charset("alphabetic")
        });

        console.log(code);

        const dateTime = new Date(expiredAt);
        

        const voucher = await prisma.voucher.create({
            data: {
                name,
                description,
                discount,
                expiredAt: dateTime,
                userId,
                code: code[0],
                minAmount
            }
        });
        
        return res.status(200).json({ success: true, data: { voucher } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const updateVoucher = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, discount, expiredAt, userId, code, minAmount } = req.body;

        const voucher = await prisma.voucher.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!voucher) throw new BadRequestError('Voucher not found');

        const updatedVoucher = await prisma.voucher.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                description,
                discount,
                expiredAt,
                userId,
                code,
                minAmount
            }
        });
        return res.status(200).json({ success: true, data: { updatedVoucher } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const deleteVoucher = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const voucher = await prisma.voucher.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!voucher) throw new BadRequestError('Voucher not found');

        await prisma.voucher.delete({
            where: {
                id: Number(id)
            }
        });
        return res.status(200).json({ success: true, data: { voucher } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const createVoucherForAllUsers = async (req: Request, res: Response) => {
    try {
        const { name, description, discount, expiredAt, minAmount } = req.body;

        const users = await prisma.user.findMany();

        users.forEach(async (user) => {
            const code = voucher_codes.generate({
                length: 5,
                charset: voucher_codes.charset("alphabetic")
            });

            const dateTime = new Date(expiredAt);

            await prisma.voucher.create({
                data: {
                    name,
                    description,
                    discount,
                    expiredAt: dateTime,
                    userId: user.id,
                    code: code[0],
                    minAmount
                }
            });
        });

        return res.status(200).json({ success: true, data: { users } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}