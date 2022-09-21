import { Router } from 'express';
import { body } from 'express-validator';
import {
    getBasket, resetBasket, updateBasketWithSelectedFoods, applyVoucherToBasket, removeFoodFromBasket, addFoodToBasket, 
    addMenuFoodsToBasket, addMenuToBasket, removeMenuFromBasket, removeVoucherFromBasket
} from '../controllers/basket.controller';
import { validateRequest } from '../middlewares/validate.request';
import { isAuthenticated } from '../middlewares/is.authenticated';
import { isAdmin } from '../middlewares/is.admin';
import { isRestaurant } from '../middlewares/is.restaurant';

const router = Router();

router.get('/basket', isAuthenticated, getBasket);
router.put('/basket/add-foods-to-basket', isAuthenticated, updateBasketWithSelectedFoods);
router.put('/basket/apply-voucher', isAuthenticated, applyVoucherToBasket);
router.put('/basket/reset-basket', isAuthenticated, resetBasket);
router.put('/basket/remove-food-from-basket', isAuthenticated, removeFoodFromBasket);
router.put('/basket/add-food-to-basket', isAuthenticated, addFoodToBasket);
router.put('/basket/add-menu-foods-to-basket', isAuthenticated, addMenuFoodsToBasket);
router.put('/basket/add-menu-to-basket', isAuthenticated, addMenuToBasket);
router.put('/basket/remove-menu-from-basket', isAuthenticated, removeMenuFromBasket);
router.put('/basket/remove-voucher', isAuthenticated, removeVoucherFromBasket);

export default router;