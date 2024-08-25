import { Request, Response } from 'express';
import { UserService } from '../services';

export default class AuthController {
    // register new users
    static async register(req: Request, res: Response) {
        const { name, mailId, password } = req.body;

        try {
            if (await UserService.isUserPresent(mailId)) {
                return res
                    .status(400)
                    .json({ message: 'Email is already registered' });
            }
            const userData = await UserService.createUser({
                name,
                mailId,
                password,
            });
            return res.status(201).json({
                message: 'User registered successfully',
                ...userData,
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
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
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            return res.json(tokens);
        } catch (error) {
            return res
                .status(500)
                .json({ message: 'Internal server error', error: error });
        }
    }

    // get new access and refresh token
    static async refreshToken(req: Request, res: Response) {
        const { token } = req.body;

        if (!token) {
            return res
                .status(400)
                .json({ message: 'Refresh Token is required' });
        }

        try {
            const tokens = await UserService.refreshUserTokens(token);

            return res.json(tokens);
        } catch (error) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    }
}
