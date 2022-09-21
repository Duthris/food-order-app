import { Request, Response } from 'express';
import prisma from '../client';
import { BadRequestError } from '../errors/bad-request-error';

export const getCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        console.log(req.headers.authorization)

        const category = await prisma.category.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                Foods: true
            }
        });
        if (!category) throw new BadRequestError('Category not found');

        return res.status(200).json({ success: true, data: category });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                Foods: true
            }
        });

        return res.status(200).json({ success: true, data: categories });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        console.log(message)
        res.status(400).json({ success: false, message });
    }
}