import { User } from '../models';
import { UserCreationAttributes, UserUpdationAttributes } from '../models/user';

export default class UserRepo {
    //get all users
    static async getAllUsers() {
        return await User.findAll({ attributes: { exclude: ['password'] } });
    }

    // get a user by their id
    static async getUserById(id: string) {
        return await User.findByPk(id, {
            attributes: { exclude: ['password'] },
        });
    }

    // get a user by their emailId
    static async getUserByMail(mailId: string) {
        return await User.findOne({
            where: { mailId },
        });
    }

    // to create new user
    static async createUser({
        name,
        mailId,
        password,
    }: UserCreationAttributes) {
        return await User.create({ name, mailId, password });
    }

    // update user details by id
    static async updateUser(id: string, payload: UserUpdationAttributes) {
        return await User.update(payload, { where: { id } });
    }

    // delete user by their id
    static async deleteUser(id: string) {
        return await User.destroy({ where: { id } });
    }
}
