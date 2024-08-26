import { SpendType } from '../models';
import {
    SpendTypeCreationAttributes,
    SpendTypeUpdateAttributes,
} from '../models/spend_type';

export default class SpendTypeRepo {
    //get all spend types
    static async getAllSpendTypes() {
        return await SpendType.findAll();
    }

    //get spend type by id
    static async getSpendType(id: string) {
        return await SpendType.findByPk(id);
    }

    //create a new spend type
    static async createSpendType({ name }: SpendTypeCreationAttributes) {
        return await SpendType.create({ name });
    }

    //update spend type
    static async updateSpendType(
        id: string,
        payload: SpendTypeUpdateAttributes
    ) {
        return await SpendType.update(payload, { where: { id } });
    }

    //delete a spend type
    static async deleteSpendType(id: string) {
        return await SpendType.destroy({ where: { id } });
    }
}
