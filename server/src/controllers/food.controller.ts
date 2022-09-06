import { Request, Response } from 'express';
import prisma from '../client';
import { BadRequestError } from '../errors/bad-request-error';
import { getIdFromToken } from '../utils/token';

export const getFood = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const food = await prisma.food.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!food) throw new BadRequestError('Food not found');

        return res.status(200).json({ success: true, data: food });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getCategoryFoods = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const category = await prisma.category.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!category) throw new BadRequestError('Category not found');

        const foods = await prisma.food.findMany({
            where: {
                Category: {
                    id: Number(id)
                }
            },
            include: {
                Restaurant: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return res.status(200).json({ success: true, data: { foods } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getRestaurantFoods = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!restaurant) throw new BadRequestError('Restaurant not found');

        const foods = await prisma.food.findMany({
            where: {
                Restaurant: {
                    id: Number(id)
                }
            },
            include: {
                Category: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({ success: true, data: { foods } });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}
