import { Router } from 'express';
import { body } from 'express-validator';
import {
    adminLogin, addAdmin, deleteAdmin, getAdmins, getAdmin, verifyRestaurant, createCategory, 
    deleteCategory, updateCategory, createVoucher, deleteVoucher, updateVoucher, createVoucherForAllUsers
} from '../controllers/admin.controller';
import { validateRequest } from '../middlewares/validate.request';
import { isAuthenticated } from '../middlewares/is.authenticated';
import { isAdmin } from '../middlewares/is.admin';

const router = Router();

router.post('/auth/login', adminLogin);
router.get('/admins', isAuthenticated, isAdmin, getAdmins);
router.get('/admins/:id', isAuthenticated, isAdmin, getAdmin);
router.post('/add-admin', isAuthenticated, isAdmin, validateRequest, addAdmin);
router.delete('/delete-admin/:id', isAuthenticated, isAdmin, validateRequest, deleteAdmin);
router.put('/verify-restaurant/:id', isAuthenticated, isAdmin, validateRequest, verifyRestaurant);
router.post('/create-category', isAuthenticated, isAdmin, validateRequest, createCategory);
router.delete('/delete-category/:id', isAuthenticated, isAdmin, validateRequest, deleteCategory);
router.put('/update-category/:id', isAuthenticated, isAdmin, validateRequest, updateCategory);
router.post('/create-voucher', isAuthenticated, isAdmin, validateRequest, createVoucher);
router.delete('/delete-voucher/:id', isAuthenticated, isAdmin, validateRequest, deleteVoucher);
router.put('/update-voucher/:id', isAuthenticated, isAdmin, validateRequest, updateVoucher);
router.post('/create-voucher-for-all-users', isAuthenticated, isAdmin, validateRequest, createVoucherForAllUsers);

export default router;