import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate.request';
import { isAuthenticated } from '../middlewares/is.authenticated';
import { isAdmin } from '../middlewares/is.admin';
import { getMenu, getRestaurantMenus } from '../controllers/menu.controller';
import { isRestaurant } from './../middlewares/is.restaurant';

const router = Router();

router.get('/menus/:id', getMenu);
router.get('/restaurant-menus/:restaurantId', getRestaurantMenus);

export default router;