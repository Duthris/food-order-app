import { Router } from 'express';
import { body } from 'express-validator';
import {
    getUsers,getUser, userRegister, userLogin, updateUser, updateUserPassword, 
    deleteUser, verifyUser, userForgotPassword, addAddress, getAddress, getAddresses,
    updateAddress, deleteAddress, getVoucher, getVouchers, addRatingToRetaurantForCompletedOrder,
    getRatingsForRestaurant
} from '../controllers/user.controller';
import { validateRequest } from '../middlewares/validate.request';
import { isAuthenticated } from '../middlewares/is.authenticated';
import { isAdmin } from '../middlewares/is.admin';

const router = Router();

router.get('/users', isAdmin, isAuthenticated, getUsers);
router.get('/users/:id', isAdmin, isAuthenticated, getUser);
router.post('/auth/register',
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6, max: 32 }).withMessage('Password must be between 6 and 16 characters'),
    validateRequest,
    userRegister
);
router.post('/auth/login', userLogin);
router.put('/auth/verify', verifyUser);
router.put('/update-profile', isAuthenticated, validateRequest, updateUser);
router.put('/update-password', isAuthenticated, validateRequest, updateUserPassword);
router.delete('/delete-account', isAuthenticated, validateRequest, deleteUser);
router.post('/forgot-password', userForgotPassword);
router.post('/add-address', isAuthenticated, validateRequest, addAddress);
router.get('/addresses/:id', isAuthenticated, getAddress);
router.get('/addresses', isAuthenticated, getAddresses);
router.put('/update-address', isAuthenticated, validateRequest, updateAddress);
router.delete('/delete-address', isAuthenticated, validateRequest, deleteAddress);
router.get('/vouchers/:id', getVoucher);
router.get('/vouchers', getVouchers);
router.get('/ratings/:id', getRatingsForRestaurant);
router.post('/orders/:id/add-rating', isAuthenticated, validateRequest, addRatingToRetaurantForCompletedOrder);

export default router;