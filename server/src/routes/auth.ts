import { Router } from 'express';
import { body } from 'express-validator';
import { 
    authUser 
} from '../controllers';
import { validateRequest } from '../middlewares/validate.request';
import { isAuthenticated } from '../middlewares/is.authenticated';
import { isAdmin } from '../middlewares/is.admin';

const router = Router();

router.get('/auth-user', isAuthenticated, isAdmin, authUser);

export default router;