import { Request, Response } from 'express';
import { User } from '../models';

export class UserController {
    static async getUser(req: Request, res: Response) {
        const userId = (req as any).userId;

        try {
            const user = await User.findByPk(userId, {
                attributes: { exclude: ['password'] },
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
