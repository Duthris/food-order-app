import { Router } from 'express';
import { body } from 'express-validator';
import {
    getBasket, resetBasket, updateBasketWithSelectedFoods, applyVoucherToBasket
} from '../controllers/basket.controller';
import { validateRequest } from '../middlewares/validate.request';
import { isAuthenticated } from '../middlewares/is.authenticated';
import { isAdmin } from '../middlewares/is.admin';
import { isRestaurant } from '../middlewares/is.restaurant';

const router = Router();

router.get('/basket', isAuthenticated, getBasket);
router.put('/basket/add-food-to-basket', isAuthenticated, updateBasketWithSelectedFoods);
router.put('/basket/apply-voucher', isAuthenticated, applyVoucherToBasket);
router.put('/basket/reset-basket', isAuthenticated, resetBasket);

export default router;