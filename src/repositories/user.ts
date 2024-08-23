import { User } from '../models';
import { UserCreationAttributes, UserUpdationAttributes } from '../models/user';

export class UserRepo {
    //get all users
    async getAllUsers() {
        return await User.findAll();
    }

    // get a user by their id
    async getUserById(id: string) {
        return await User.findByPk(id);
    }
    // to create new user
    async createUser({ name, mailId, password }: UserCreationAttributes) {
        return await User.create({ name, mailId, password });
    }

    // to check if user already exists
    async userExists(mailId: string): Promise<boolean> {
        const user = await User.findOne({ where: { mailId } });
        return user !== null;
    }

    // update user details by id
    async updateUser(id: string, updates: UserUpdationAttributes) {
        return await User.update(updates, { where: { id } });
    }

    // delete user by their id
    async deleteUser(id: string) {
        return await User.destroy({ where: { id } });
    }
}
