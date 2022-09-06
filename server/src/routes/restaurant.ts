import { Router } from 'express';
import { body } from 'express-validator';
import {
    restaurantRegister, restaurantLogin, deleteRestaurant, getRestaurant, 
    getRestaurantOrder, updateRestaurant, createFood, updateFood, deleteFood,
    createMenu, updateMenu, deleteMenu, addFoodToMenu, getRestaurantMenusByRestaurant, 
    removeFoodFromMenu, updateOrderStatus, getRestaurantOrdersByRestaurant
} from '../controllers/restaurant.controller';
import { validateRequest } from '../middlewares/validate.request';
import { isAuthenticated } from '../middlewares/is.authenticated';
import { isAdmin } from '../middlewares/is.admin';
import { isRestaurant } from '../middlewares/is.restaurant';

const router = Router();

router.post('/auth/register', 
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6, max: 16 }).withMessage('Password must be between 6 and 16 characters'),
    validateRequest,
    restaurantRegister
    );
router.post('/auth/login', restaurantLogin);
router.delete('/delete-restaurant', isAuthenticated, isRestaurant, validateRequest, deleteRestaurant );
router.get('/restaurant', isAuthenticated, isRestaurant, getRestaurant );
router.get('/restaurant-orders/:id', isAuthenticated, isRestaurant, getRestaurantOrder );
router.put('/update-restaurant', isAuthenticated, isRestaurant, validateRequest, updateRestaurant );
router.post('/add-food', isAuthenticated, isRestaurant, validateRequest, createFood);
router.put('/update-food', isAuthenticated, isRestaurant, validateRequest, updateFood);
router.delete('/delete-food/:id', isAuthenticated, isRestaurant, validateRequest, deleteFood);
router.post('/create-menu', isAuthenticated, isRestaurant, validateRequest, createMenu);
router.put('/update-menu/:menuId', isAuthenticated, isRestaurant, validateRequest, updateMenu);
router.delete('/delete-menu/:menuId', isAuthenticated, isRestaurant, validateRequest, deleteMenu);
router.post('/add-food-to-menu', isAuthenticated, isRestaurant, validateRequest, addFoodToMenu);
router.get('/get-restaurant-menus', isAuthenticated, isRestaurant, getRestaurantMenusByRestaurant);
router.delete('/remove-food-from-menu', isAuthenticated, isRestaurant, validateRequest, removeFoodFromMenu);
router.put('/update-order-status', isAuthenticated, isRestaurant, validateRequest, updateOrderStatus);
router.get('/restaurant-orders', isAuthenticated, isRestaurant, getRestaurantOrdersByRestaurant);

export default router;
