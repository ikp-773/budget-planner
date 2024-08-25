import { Request, Response } from 'express';
import { UserService } from '../services';

export default class UserController {
    static async getUser(req: Request, res: Response) {
        const userId = (req as any).userId;

        try {
            const user = await UserService.getUserById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
