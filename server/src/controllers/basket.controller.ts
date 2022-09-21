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
                Foods: true,
                Menus: true
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
                Menus: {
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

        const voucher = await prisma.voucher.findUnique({
            where: {
                code
            }
        })

        if (!voucher) throw new BadRequestError('Voucher not found');

        if (voucher.active === false) throw new BadRequestError('Voucher is not active');

        if (voucher.expiredAt < new Date()) throw new BadRequestError('Voucher has expired');


        if (basket.amount! < voucher.minAmount!) throw new BadRequestError('Basket amount is less than voucher minimum amount');

        const newTotalAmount = basket.amount! - voucher.discount > 0 ? basket.amount! - voucher.discount : 0;

        const updatedBasket = await prisma.basket.update({
            where: {
                userId: Number(id)
            },
            data: {
                amount: newTotalAmount
            }
        })

        res.status(200).json({ success: true, data: updatedBasket, voucher: voucher })
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
}

export const removeVoucherFromBasket = async (req: Request, res: Response) => {
    try {
        const id = getIdFromToken(req);

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

        const basketFoodsPrice = basket?.Foods?.reduce((acc: number, food: any) => { return acc + food.price }, 0) | 0;
        const basketMenusPrice = basket?.Menus?.reduce((acc: number, menu: any) => { return acc + menu.menuPrice }, 0) | 0;

        const newTotalAmount = basketFoodsPrice! + basketMenusPrice!;

        await prisma.basket.update({
            where: {
                userId: Number(id)
            },
            data: {
                amount: 0
            }
        })

        const updatedBasket = await prisma.basket.update({
            where: {
                userId: Number(id)
            },
            data: {
                amount: newTotalAmount
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

export const removeFoodFromBasket = async (req: Request, res: Response) => {
    try {
        const { foodId } = req.body;
        const id = getIdFromToken(req);

        const basket = await prisma.basket.findUnique({
            where: {
                userId: Number(id)
            }
        })

        if (!basket) throw new BadRequestError('Basket not found');

        if (basket.userId !== id) throw new NotAuthorizedError();

        const food = await prisma.food.findUnique({
            where: {
                id: Number(foodId)
            }
        })

        if (!food) throw new BadRequestError('Food not found');

        const updatedBasket = await prisma.basket.update({
            where: {
                userId: Number(id)
            },
            data: {
                Foods: {
                    disconnect: {
                        id: Number(foodId)
                    }
                },
                amount: basket.amount! - food.price! > 0 ? basket.amount! - food.price! : 0
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

export const addFoodToBasket = async (req: Request, res: Response) => {
    try {
        const { foodId } = req.body;
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

        const food = await prisma.food.findUnique({
            where: {
                id: Number(foodId)
            }
        })

        if (!food) throw new BadRequestError('Food not found');

        if (basket.Foods.some((food: any) => food.id === Number(foodId))) throw new BadRequestError('Food already in basket');

        if (basket.Foods.some((basketFood: any) => basketFood.restaurantId !== food.restaurantId)) throw new BadRequestError('Food is from different restaurant');

        const updatedBasket = await prisma.basket.update({
            where: {
                userId: Number(id)
            },
            data: {
                Foods: {
                    connect: {
                        id: Number(foodId)
                    }
                },
                amount: basket.amount! + food.price!
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

export const addMenuFoodsToBasket = async (req: Request, res: Response) => {
    try {
        const { menuId } = req.body;
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

        const menu = await prisma.menu.findUnique({
            where: {
                id: Number(menuId)
            },
            include: {
                Foods: true
            }
        })

        if (!menu) throw new BadRequestError('Menu not found');

        if (basket.Foods.some((food: any) => menu.Foods.some((menuFood: any) => menuFood.id === food.id))) throw new BadRequestError('Some menu foods already in basket');

        if (basket.Foods.some((basketFood: any) => basketFood.restaurantId !== menu.restaurantId)) throw new BadRequestError('Menu is from different restaurant');

        const updatedBasket = await prisma.basket.update({
            where: {
                userId: Number(id)
            },
            data: {
                Foods: {
                    connect: menu.Foods.map(food => ({ id: food.id }))
                },
                amount: basket.amount! + menu.menuPrice!
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

export const addMenuToBasket = async (req: Request, res: Response) => {
    try {
        const { menuId } = req.body;
        const id = getIdFromToken(req);

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

        const menu = await prisma.menu.findUnique({
            where: {
                id: Number(menuId)
            },
            include: {
                Foods: true
            }
        })

        if (!menu) throw new BadRequestError('Menu not found');

        if (basket.Menus.some((basketMenu: any) => basketMenu.id === Number(menuId))) throw new BadRequestError('Menu already in basket');

        if (basket.Menus.some((basketMenu: any) => basketMenu.restaurantId !== menu.restaurantId)) throw new BadRequestError('Menu is from different restaurant');

        const updatedBasket = await prisma.basket.update({
            where: {
                userId: Number(id)
            },
            data: {
                Menus: {
                    connect: {
                        id: Number(menuId)
                    }
                },
                amount: basket.amount! + menu.menuPrice!
            },
            include: {
                Foods: true,
                Menus: true
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

export const removeMenuFromBasket = async (req: Request, res: Response) => {
    try {
        const { menuId } = req.body;
        const id = getIdFromToken(req);

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

        const menu = await prisma.menu.findUnique({
            where: {
                id: Number(menuId)
            },
            include: {
                Foods: true
            }
        })

        if (!menu) throw new BadRequestError('Menu not found');

        if (!basket.Menus.some((basketMenu: any) => basketMenu.id === Number(menuId))) throw new BadRequestError('Menu not in basket');

        if (basket.Menus.some((basketMenu: any) => basketMenu.restaurantId !== menu.restaurantId)) throw new BadRequestError('Menu is from different restaurant');

        const updatedBasket = await prisma.basket.update({
            where: {
                userId: Number(id)
            },
            data: {
                Menus: {
                    disconnect: {
                        id: Number(menuId)
                    }
                },
                amount: basket.amount! - menu.menuPrice! > 0 ? basket.amount! - menu.menuPrice! : 0
            },
            include: {
                Foods: true,
                Menus: true
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