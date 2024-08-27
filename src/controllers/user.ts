import { Request, Response } from 'express';
import { UserService } from '../services';
import ResponseHelper from '../helpers/response';

export default class UserController {
    // get logged in user
    static async getUser(req: Request, res: Response) {
        const userId = (req as any).userId;

        try {
            const user = await UserService.getUserById(userId);

            if (!user) {
                return ResponseHelper.error(
                    res,
                    'user not found',
                    404,
                    'User not found'
                );
            }
            return ResponseHelper.success(res, user);
        } catch (error) {
            return ResponseHelper.error(res, error);
        }
    }

    // update logged in user data
    static async updateUser(req: Request, res: Response) {
        const userId = (req as any).userId;
        const body = req.body;

        try {
            await UserService.updateUser(userId, body);
            return ResponseHelper.success(
                res,
                `user data updated`,
                'User updated successfully'
            );
        } catch (error) {
            return ResponseHelper.error(res, error);
        }
    }

    //delete account
    static async deleteUser(req: Request, res: Response) {
        const userId = (req as any).userId;

        try {
            await UserService.deleteUser(userId);
            return ResponseHelper.success(
                res,
                `user ${userId} deleted`,
                'User updated successfully'
            );
        } catch (error) {
            return ResponseHelper.error(res, error);
        }
    }
}
