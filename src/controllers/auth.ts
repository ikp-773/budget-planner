import { Request, Response } from 'express';
import { UserService } from '../services';
import ResponseHelper from '../helpers/response';

export default class AuthController {
    // register new users
    static async register(req: Request, res: Response) {
        const { name, mailId, password } = req.body;

        try {
            if (await UserService.isUserPresent(mailId)) {
                return ResponseHelper.error(
                    res,
                    'email already registered',
                    400,
                    'Email is already registered'
                );
            }
            const userData = await UserService.createUser({
                name,
                mailId,
                password,
            });
            return ResponseHelper.created(
                res,
                userData,
                'User registered successfully'
            );
        } catch (error) {
            return ResponseHelper.error(res, error);
        }
    }

    // login user
    static async login(req: Request, res: Response) {
        const { mailId, password } = req.body;

        try {
            const { success, tokens } = await UserService.loginUser(
                mailId,
                password
            );

            if (!success) {
                return ResponseHelper.error(
                    res,
                    'invalid credentials',
                    401,
                    'Invalid Credentials'
                );
            }

            return ResponseHelper.success(
                res,
                tokens,
                'User logged in successfully'
            );
        } catch (error) {
            return ResponseHelper.error(res, error);
        }
    }

    // get new access and refresh token
    static async refreshToken(req: Request, res: Response) {
        const { token } = req.body;

        if (!token) {
            return ResponseHelper.error(
                res,
                'token not present',
                400,
                'Refresh Token is required'
            );
        }

        try {
            const tokens = await UserService.refreshUserTokens(token);
            return ResponseHelper.success(
                res,
                tokens,
                'Tokens successfully refreshed'
            );
        } catch (error) {
            return ResponseHelper.error(
                res,
                error,
                403,
                'Invalid refresh token'
            );
        }
    }
}
