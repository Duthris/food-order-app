import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';

type UserPayload = {
    id: Number;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.replace('Bearer ', '');
    }

    if (!token) {
        throw new NotAuthorizedError();
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        req.currentUser = payload;
        //res.locals 
        next();
    } catch (e) {
        let message;        
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message })
    }
}