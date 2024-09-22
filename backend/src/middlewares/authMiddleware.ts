import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware to authenticate user
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        //@ts-ignore
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Middleware to authorize user for task and user routes
export const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const user = req.user;

    if (!user) {
        return res.status(403).json({ message: 'Access denied. User not authorized.' });
    }

    next();
};