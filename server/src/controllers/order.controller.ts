import { Request, Response } from 'express';
import prisma from '../client';
import { BadRequestError } from '../errors/bad-request-error';
import { comparePassword, hashPassword } from '../utils/password';
import generateToken from '../utils/generateToken';
import { getIdFromToken } from '../utils/token';
import { NotAuthorizedError } from './../errors/not-authorized-error';

export const convertBasketToOrder = async (req: Request, res: Response) => {
    try {
        const id = getIdFromToken(req);

        const { addressId, code } = req.body;

        const basket = await prisma.basket.findUnique({
            where: {
                userId: Number(id)
            }, 
            include: {
                Foods: true,
                Menus: true
            }
        })

        if (!basket) throw new BadRequestError('Basket not found');
        if (basket.userId !== id) throw new NotAuthorizedError();

        const restaurantId = basket.Foods[0] ? basket.Foods[0].restaurantId : basket.Menus[0].restaurantId;

        const order = await prisma.order.create({
            data: {
                userId: Number(id),
                amount: basket.amount,
                restaurantId: Number(restaurantId),
                addressId: Number(addressId),
                Foods: {
                    connect: basket.Foods.map(food => ({ id: food.id }))
                },
                Menus: {
                    connect: basket.Menus.map(menu => ({ id: menu.id }))
                }
            }
        })

        const updatedBasket = await prisma.basket.update({
            where: {
                userId: Number(id)
            },
            data: {
                amount: 0,
                Foods: {
                    disconnect: basket.Foods.map((food: any) => ({
                        id: Number(food.id)
                    }))
                },
                Menus: {
                    disconnect: basket.Menus.map((menu: any) => ({
                        id: Number(menu.id)
                    }))
                }
            },
            include: {
                Foods: true,
                Menus: true
            }
        })

        if (code) {
            const voucher = await prisma.voucher.findUnique({
                where: {
                    code
                }
            })
    
            if (!voucher) throw new BadRequestError('Voucher not found');
    
            if (voucher.active === false) throw new BadRequestError('Voucher is not active');
    
            if (voucher.expiredAt < new Date()) throw new BadRequestError('Voucher has expired');
    
            await prisma.voucher.update({
                where: {
                    code
                },
                data: {
                    active: false
                }
            })
        }
        

        res.status(200).json({ success: true, data: order, updatedBasket })

    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const id = getIdFromToken(req);

        const orders = await prisma.order.findMany({
            where: {
                userId: Number(id)
            }, 
            include: {
                User: {
                    select: {
                        Basket: {
                            select: {
                                Foods: true
                            }
                        }
                },
            },
            Restaurant: true,
            Menus: true,
            Foods: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
        res.status(200).json({ success: true, data: orders })

    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getOrder = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const id = getIdFromToken(req);

        const order = await prisma.order.findUnique({
            where: {
                id: Number(orderId)
            },
        })

        if (!order) throw new BadRequestError('Order not found');
        if (order.userId !== id) throw new NotAuthorizedError();

        res.status(200).json({ success: true, data: order })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getOrdersByRestaurant = async (req: Request, res: Response) => {
    try {
        const { restaurantId } = req.params;
        const id = getIdFromToken(req);

        const orders = await prisma.order.findMany({
            where: {
                restaurantId: Number(restaurantId),
                userId: Number(id)
            },
        })

        if (!orders) throw new BadRequestError('Order not found');
        if (orders[0].userId !== id) throw new NotAuthorizedError();

        res.status(200).json({ success: true, data: orders })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}