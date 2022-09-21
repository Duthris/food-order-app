import { Request, Response } from 'express';
import prisma from '../client';
import { BadRequestError } from '../errors/bad-request-error';
import { comparePassword, hashPassword } from '../utils/password';
import generateToken from '../utils/generateToken';
import { getIdFromToken } from '../utils/token';
import { NotAuthorizedError } from './../errors/not-authorized-error';

export const restaurantRegister = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password: enteredPassword, address, photo } = req.body;

        const restaurantUser = await prisma.restaurantUser.findUnique({
            where: {
                email
            }
        });
    
        if (restaurantUser) throw new BadRequestError('Restaurant already exists');

        const hash = await hashPassword(enteredPassword);
        const newRestaurantUser = await prisma.restaurantUser.create({
            data: {
                password: hash,
                name,
                email,
                phone,
                address,
                photo
            }
        });

        const restaurant = await prisma.restaurant.create({
            data: {
                restaurantUserId: newRestaurantUser.id,
                name: newRestaurantUser.name,
                photo: newRestaurantUser.photo,
                phone: newRestaurantUser.phone,
                address: newRestaurantUser.address,
            }
        });

        const token = generateToken(newRestaurantUser, 'restaurant');

        return res.status(200).json({ 
            success: true, 
            data: { 
                token, user: newRestaurantUser, restaurant: restaurant 
        } });

    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const restaurantLogin = async (req: Request, res: Response) => {
    try {
        const { email, password: enteredPassword } = req.body;
        const restaurantUser = await prisma.restaurantUser.findUnique({
            where: {
                email
            }
        });
        if (!restaurantUser) throw new BadRequestError('Invalid credentials');
        else if (!restaurantUser.verified) throw new BadRequestError('You need to verify your account to login!');
        const passwordsMatch = await comparePassword(enteredPassword, restaurantUser.password);
        if (!passwordsMatch) throw new BadRequestError('Invalid password');
        const token = generateToken(restaurantUser, 'restaurant');
        
        const restaurant = await prisma.restaurant.findFirst({
            where: {
                restaurantUserId: restaurantUser.id
            }
        });
        
        return res.status(200).json({ success: true, data: { token, user: restaurantUser, restaurant: restaurant } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getRestaurant = async (req: Request, res: Response) => {
    try {
        const id = getIdFromToken(req);

        const restaurantUser = await prisma.restaurantUser.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                Restaurant: true,
            }

        });
        if (!restaurantUser) throw new BadRequestError('Restaurant not found');
        return res.status(200).json({ success: true, data: { restaurantUser } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const updateRestaurant = async (req: Request, res: Response) => {
    try {
        const id = getIdFromToken(req);
        const { name, photo, phone } = req.body;
        
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                restaurantUserId: Number(id)
            }
        });

        if (!restaurant) throw new BadRequestError('Restaurant not found');

        await prisma.restaurant.update({
            where: {
                id: restaurant.id
            },
            data: {
                name,
                photo,
                phone
            }
        });
        return res.status(200).json({ success: true, data: { restaurant } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const deleteRestaurant = async (req: Request, res: Response) => {
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
        await prisma.restaurant.delete({
            where: {
                id: restaurant.id
            }
        });
        return res.status(200).json({ success: true, data: { restaurant, restaurantUser } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getRestaurantOrdersByRestaurant = async (req: Request, res: Response) => {
    try {
        const id = getIdFromToken(req);

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                restaurantUserId: id
            }
        })

        if (!restaurant) throw new BadRequestError('Restaurant not found');

        const orders = await prisma.order.findMany({
            where: {
                restaurantId: restaurant.id
            }, 
            orderBy: {
                createdAt: 'desc'
            }
        });
        if (!orders) throw new BadRequestError('Orders not found');
        return res.status(200).json({ success: true, data: { orders } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getRestaurantMenusByRestaurant = async (req: Request, res: Response) => {
    const id = getIdFromToken(req);

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            restaurantUserId: Number(id)
        },
    });

    if (!restaurant) {
        throw new BadRequestError('Restaurant not found');
    }

    if (restaurant.restaurantUserId !== id) {
        throw new BadRequestError('You are not authorized to access this resource');
    }

    const menus = await prisma.menu.findMany({
        where: {
            restaurantId: restaurant.id
        },
        include: {
            Foods: true,
        },
        orderBy: {
            id: 'desc'
        }
    });

    res.status(200).json(menus);
}

export const createMenu = async (req: Request, res: Response) => {
    try {
        const id = getIdFromToken(req);

        const { name, menuPrice, foods } = req.body;

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                restaurantUserId: id
            }
        });
        if (!restaurant) throw new BadRequestError('Restaurant not found');

        const menuExist = await prisma.menu.findFirst({
            where: {
                name,
                restaurantId: restaurant.id
            }
        });

        if (menuExist) throw new BadRequestError('Menu already exist');

        const menu = await prisma.menu.create({
            data: {
                name,
                restaurantId: restaurant.id,
                menuPrice: Number(menuPrice),
                Foods: {
                    connect: foods.map((food: any) => ({ id: food.id }))
                }
            }
        });

        return res.status(200).json({ success: true, data: menu });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const updateMenu = async (req: Request, res: Response) => {
    try {
        const { menuId } = req.params;
        const { name } = req.body;
        const id = getIdFromToken(req);

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                restaurantUserId: id
            }
        });

        if (!restaurant) throw new BadRequestError('Restaurant not found');

        const menu = await prisma.menu.findUnique({
            where: {
                id: Number(menuId)
            }
        });

        if (!menu) throw new BadRequestError('Menu not found');

        await prisma.menu.update({
            where: {
                id: menu.id
            },
            data: {
                name,
                Foods: {

                }
            }
        });

        return res.status(200).json({ success: true, data: menu });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const { menuId } = req.params;
        const id = getIdFromToken(req);

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: id
            }
        });

        if (!restaurant) throw new BadRequestError('Restaurant not found');

        const menu = await prisma.menu.findUnique({
            where: {
                id: Number(menuId)
            }
        });

        if (!menu) throw new BadRequestError('Menu not found');

        if (menu.restaurantId !== restaurant.id) throw new BadRequestError('You are not authorized to access this resource');

        await prisma.menu.delete({
            where: {
                id: menu.id
            }
        });

        return res.status(200).json({ success: true, data: menu });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const addFoodToMenu = async (req: Request, res: Response) => {
    try {
        const { foodId, menuId } = req.body;
        const id = getIdFromToken(req);

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                restaurantUserId: id
            }
        });

        if (!restaurant) throw new BadRequestError('Restaurant not found');

        const menu = await prisma.menu.findUnique({
            where: {
                id: Number(menuId)
            }
        });

        if (!menu) throw new BadRequestError('Menu not found');

        if (menu.restaurantId !== restaurant.id) throw new BadRequestError('You are not authorized to access this resource');

        const food = await prisma.food.findUnique({
            where: {
                id: Number(foodId)
            }
        });

        if (!food) throw new BadRequestError('Food not found');

        await prisma.menu.update({
            where: {
                id: menu.id
            },
            data: {
                Foods: {
                    connect: {
                        id: food.id
                    }
                }
            }
        });

        return res.status(200).json({ success: true, data: menu });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const removeFoodFromMenu = async (req: Request, res: Response) => {
    try {
        const { foodId, menuId } = req.body;
        const id = getIdFromToken(req);

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                restaurantUserId: id
            }
        });

        if (!restaurant) throw new BadRequestError('Restaurant not found');

        const menu = await prisma.menu.findUnique({
            where: {
                id: Number(menuId)
            }
        });

        if (!menu) throw new BadRequestError('Menu not found');

        if (menu.restaurantId !== restaurant.id) throw new BadRequestError('You are not authorized to access this resource');

        const food = await prisma.food.findUnique({
            where: {
                id: Number(foodId)
            }
        });

        if (!food) throw new BadRequestError('Food not found');

        await prisma.menu.update({
            where: {
                id: menu.id
            },
            data: {
                Foods: {
                    disconnect: {
                        id: food.id
                    }
                }
            }
        });

        return res.status(200).json({ success: true, data: menu });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const createFood = async (req: Request, res: Response) => {
    try {
        const { name, description, price, categoryId, menuId, stock } = req.body;

        const id = getIdFromToken(req);

        const menu = await prisma.menu.findUnique({
            where: {
                id: Number(menuId)
            }
        });

        if (!menu) throw new BadRequestError('Menu not found');

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                restaurantUserId: id
            }
        });

        if (!restaurant) throw new BadRequestError('Restaurant not found');

        if (restaurant.id !== menu.restaurantId) throw new BadRequestError('You can only add food to your own menu');

        const foodExist = await prisma.food.findUnique({
            where: {
                name: name
            }
        });

        if (foodExist) throw new BadRequestError('Food already exist');

        const food = await prisma.food.create({
            data: {
                name,
                description,
                price,
                menuId: menu.id,
                categoryId: categoryId,
                restaurantId: menu.restaurantId,
                stock
            }
        });

        return res.status(200).json({ success: true, data: food });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const updateFood = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price, categoryId } = req.body;
        const restaurantUserId = getIdFromToken(req);

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                restaurantUserId: restaurantUserId
            }
        });

        if (!restaurant) throw new BadRequestError('Restaurant not found');


        const food = await prisma.food.findUnique({
            where: {
                id: Number(id)
            }
        });

    

        if (!food) throw new BadRequestError('Food not found');

        if (restaurant.id !== food.restaurantId) throw new BadRequestError('You can only update your own food');

        await prisma.food.update({
            where: {
                id: food.id
            },
            data: {
                name,
                description,
                price,
                categoryId
            }
        });

        return res.status(200).json({ success: true, data: food });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const deleteFood = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const restaurantUserId = getIdFromToken(req);

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                restaurantUserId: restaurantUserId
            }
        });

        if (!restaurant) throw new BadRequestError('Restaurant not found');

        const food = await prisma.food.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!food) throw new BadRequestError('Food not found');
        if (restaurant.id !== food.restaurantId) throw new BadRequestError('You can only delete your own food');

        await prisma.food.delete({
            where: {
                id: food.id
            }
        });

        return res.status(200).json({ success: true, data: food });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { orderId, status } = req.body;

        const order = await prisma.order.update({
            where: {
                id: Number(orderId)
            },
            data: {
                status
            }
        })

        res.status(200).json({ success: true, data: order })

    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getRestaurantOrder = async (req: Request, res: Response) => {
    try {
        const restaurantId = getIdFromToken(req);
        const orderId = req.params.id;

        const order = await prisma.order.findUnique({
            where: {
                id: Number(orderId)
            }
        })

        if (!order) throw new BadRequestError('Order not found');
        if (order.restaurantId !== Number(restaurantId)) throw new NotAuthorizedError();

        res.status(200).json({ success: true, data: order })

    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getAverageRating = async (req: Request, res: Response) => {
    try {
        const { restaurantId } = req.params;

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: Number(restaurantId)
            },
            include: {
                Ratings: true
            }
        })

        if (!restaurant) throw new BadRequestError('Restaurant not found');

        const averageRating = restaurant.Ratings.reduce((acc, rating) => acc + rating.rating, 0) / restaurant.Ratings.length;

        res.status(200).json({ success: true, data: averageRating })

    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}
