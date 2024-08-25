import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from '../helpers/jwt';
import { UserCreationAttributes } from '../models/user';
import { UserRepo } from '../repositories';
import bcrypt from 'bcryptjs';

export default class UserService {
    // get user by id
    static async getUserById(id: string) {
        return await UserRepo.getUserById(id);
    }

    //check if a mail is already registered
    static async isUserPresent(mailId: string) {
        const user = await UserRepo.getUserByMail(mailId);
        return user !== null;
    }

    // create new user
    static async createUser(payload: UserCreationAttributes) {
        const newUser = await UserRepo.createUser(payload);

        const accessToken = generateAccessToken(newUser.id);
        const refreshToken = generateRefreshToken(newUser.id);

        return {
            user: {
                id: newUser.id,
                name: newUser.name,
                mailId: newUser.mailId,
            },
            accessToken,
            refreshToken,
        };
    }

    // login existing user
    static async loginUser(mailId: string, password: string) {
        const user = await UserRepo.getUserByMail(mailId);
        if (!user) {
            return { success: false, tokens: null };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { success: false, tokens: null };
        }
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        return { success: true, tokens: { accessToken, refreshToken } };
    }

    // get new access and refresh token
    static async refreshUserTokens(refreshToken: string) {
        const payload: any = verifyRefreshToken(refreshToken);
        const newAccessToken = generateAccessToken(payload.userId);
        const newRefreshToken = generateRefreshToken(payload.userId);
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
}
