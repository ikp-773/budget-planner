import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models';
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from '../helpers/jwt';

export class AuthController {
    static async register(req: Request, res: Response) {
        const { name, mailId, password } = req.body;

        try {
            const existingUser = await User.findOne({ where: { mailId } });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: 'Email is already registered' });
            }

            const newUser = await User.create({ name, mailId, password });

            // Generate tokens
            const accessToken = generateAccessToken(newUser.id);
            const refreshToken = generateRefreshToken(newUser.id);

            console.log('Generated token: ' + accessToken);

            return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    mailId: newUser.mailId,
                },
                accessToken,
                refreshToken,
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async login(req: Request, res: Response) {
        const { mailId, password } = req.body;

        try {
            const user = await User.findOne({ where: { mailId } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const accessToken = generateAccessToken(user.id);
            const refreshToken = generateRefreshToken(user.id);

            return res.json({ accessToken, refreshToken });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async logout(req: Request, res: Response) {
        // For a simple logout, you could remove the refresh token from a database or in-memory store.
        return res.status(200).json({ message: 'Logged out successfully' });
    }

    static async refreshToken(req: Request, res: Response) {
        const { token } = req.body;

        if (!token) {
            return res
                .status(400)
                .json({ message: 'Refresh Token is required' });
        }

        try {
            const payload: any = verifyRefreshToken(token);
            const newAccessToken = generateAccessToken(payload.userId);
            const newRefreshToken = generateRefreshToken(payload.userId);

            return res.json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        } catch (error) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    }
}
