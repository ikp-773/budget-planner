import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../helpers/jwt';

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401).json({ message: 'Access forbidden' });
    }

    try {
        const payload = verifyAccessToken(token);
        (req as any).userId = (payload as any).userId;
        next();
    } catch (error) {
        return res.sendStatus(403).json({ message: 'Invalid access token' });
    }
};
