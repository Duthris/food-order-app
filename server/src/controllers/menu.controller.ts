import { Request, Response } from 'express';
import prisma from '../client';
import { BadRequestError } from '../errors/bad-request-error';

export const getMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const menu = await prisma.menu.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                Foods: true
            }
        })

        if (!menu) throw new BadRequestError('Menu not found');

        return res.status(200).json({ success: true, data: menu });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getRestaurantMenus = async (req: Request, res: Response) => {
    try {
        const { restaurantId } = req.params; 

        const menus = await prisma.menu.findMany({
            where: {
                Restaurant: {
                    id: Number(restaurantId)
                }
            },
            include: {
                Foods: true
            }
        });

        return res.status(200).json({ success: true, data: menus });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}