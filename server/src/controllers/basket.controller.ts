import { Request, Response } from 'express';
import prisma from '../client';
import { BadRequestError } from '../errors/bad-request-error';
import { comparePassword, hashPassword } from '../utils/password';
import generateToken from '../utils/generateToken';
import { getIdFromToken } from '../utils/token';
import { NotAuthorizedError } from './../errors/not-authorized-error';

export const updateBasketWithSelectedFoods = async (req: Request, res: Response) => {
    try {
        const { foods } = req.body;
        const id = getIdFromToken(req);

        const foodsFromDb = await prisma.food.findMany({
            where: {
                id: {
                    in: foods.map((food: any) => Number(food.id))
                },
            },
        });
        
        const basket = await prisma.basket.findUnique({
            where: {
                userId: Number(id)
            }
        })        

        if (!basket) throw new BadRequestError('Basket not found');
        if (basket.userId !== id) throw new NotAuthorizedError();
        if (!foods) throw new BadRequestError('No foods provided');
        if (foods.length === 0) throw new BadRequestError('No food selected');

        const restaurantIds = foodsFromDb.map((food: any) => food.restaurantId);     

        if (new Set(restaurantIds).size !== 1) throw new BadRequestError('Foods are not from the same restaurant');


        // TODO
        const amount = foodsFromDb.reduce((acc: number, food: any) => {
            return acc + food.price;
        }, 0);

        const totalAmount = amount + basket.amount!;
        
        console.log('totalAmount', totalAmount);

        const updatedBasket = await prisma.basket.update({
            where: {
                userId: Number(id)
            },
            data: {
                Foods: {
                    connect: foodsFromDb.map((food: any) => ({
                        id: Number(food.id)
                    }))
                },
                amount: totalAmount
            },
            include: {
                Foods: true
            }
        })

        res.status(200).json({ success: true, data: updatedBasket })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getBasket = async (req: Request, res: Response) => {
    try {
        const id = getIdFromToken(req);

        const basket = await prisma.basket.findUnique({
            where: {
                userId: Number(id)
            },
            include: {
                Foods: true
            }
        })

        if (!basket) throw new BadRequestError('Basket not found');

        if (basket.userId !== id) throw new NotAuthorizedError();

        res.status(200).json({ success: true, data: basket })

    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const resetBasket = async (req: Request, res: Response) => {
    try {
        const id = getIdFromToken(req);

        const basket = await prisma.basket.findUnique({
            where: {
                userId: Number(id)
            }
        })

        if (!basket) throw new BadRequestError('Basket not found');

        if (basket.userId !== id) throw new NotAuthorizedError();

        const updatedBasket = await prisma.basket.update({
            where: {
                userId: Number(id)
            },
            data: {
                Foods: {
                    set: []
                },
                amount: 0
            }
        })

        res.status(200).json({ success: true, data: updatedBasket })

    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const applyVoucherToBasket = async (req: Request, res: Response) => {
    try {
        const { code } = req.body;
        const id = getIdFromToken(req);

        const basket = await prisma.basket.findUnique({
            where: {
                userId: Number(id)
            }
        })

        if (!basket) throw new BadRequestError('Basket not found');

        if (basket.userId !== id) throw new NotAuthorizedError();

        const voucher = await prisma.voucher.findUnique({
            where: {
                code
            }
        })

        if (!voucher) throw new BadRequestError('Voucher not found');

        if (voucher.active === false) throw new BadRequestError('Voucher is not active');

        if (voucher.expiredAt < new Date()) throw new BadRequestError('Voucher has expired');


        if (basket.amount! < voucher.minAmount!) throw new BadRequestError('Basket amount is less than voucher minimum amount');
        const newTotalAmount = basket.amount! - voucher.discount;

        const updatedBasket = await prisma.basket.update({
            where: {
                userId: Number(id)
            },
            data: {
                amount: newTotalAmount
            }
        })

        const updatedVoucher = await prisma.voucher.update({
            where: {
                id: voucher.id
            },
            data: {
                active: false
            }
        })

        res.status(200).json({ success: true, data: updatedBasket, voucher: updatedVoucher })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}