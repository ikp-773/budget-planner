import { Request, Response } from 'express';
import { UserService } from '../services';

export default class UserController {
    // get logged in user
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

    // update logged in user data
    static async updateUser(req: Request, res: Response) {
        const userId = (req as any).userId;
        const body = req.body;

        try {
            await UserService.updateUser(userId, body);
            return res.json({ message: `Updated user` });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    //delete account
    static async deleteUser(req: Request, res: Response) {
        const userId = (req as any).userId;

        try {
            await UserService.deleteUser(userId);
            return res.json({ message: `User ${userId} deleted` });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
