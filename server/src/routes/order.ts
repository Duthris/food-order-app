import { Router } from 'express';
import { body } from 'express-validator';
import {
    getOrder, getOrders, getOrdersByRestaurant, convertBasketToOrder
} from '../controllers/order.controller';
import { validateRequest } from '../middlewares/validate.request';
import { isAuthenticated } from '../middlewares/is.authenticated';
import { isAdmin } from '../middlewares/is.admin';
import { isRestaurant } from '../middlewares/is.restaurant';

const router = Router();

router.get('/orders/:orderId', isAuthenticated, getOrder);
router.get('/orders', isAuthenticated, getOrders);
router.get('/orders/restaurant/:restaurantId', isAuthenticated, getOrdersByRestaurant);
router.post('/orders/convert-basket-to-order', isAuthenticated, convertBasketToOrder);

export default router;
