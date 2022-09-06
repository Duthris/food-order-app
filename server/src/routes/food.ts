import { Router } from 'express';
import { body } from 'express-validator';
import {
    getFood, getCategoryFoods, getRestaurantFoods
} from '../controllers/food.controller';
import { validateRequest } from '../middlewares/validate.request';
import { isAuthenticated } from '../middlewares/is.authenticated';
import { isAdmin } from '../middlewares/is.admin';
import { isRestaurant } from '../middlewares/is.restaurant';

const router = Router();

router.get('/foods/:id', getFood);
router.get('/category-foods/:id', getCategoryFoods);
router.get('/restaurant-foods/:id', getRestaurantFoods);

export default router;
