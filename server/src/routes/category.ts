import { Router } from 'express';
import { body } from 'express-validator';
import {
    getCategories, getCategory
} from '../controllers/category.controller';
import { validateRequest } from '../middlewares/validate.request';
import { isAuthenticated } from '../middlewares/is.authenticated';
import { isAdmin } from '../middlewares/is.admin';
import { isRestaurant } from '../middlewares/is.restaurant';

const router = Router();

router.get('/categories', getCategories);
router.get('/categories/:id', getCategory);

export default router;
