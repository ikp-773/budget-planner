import { SpendTypeRepo } from '../repositories';

export default class SpendTypeService {
    // get all spend types
    static async getAllSpendTypes() {
        return await SpendTypeRepo.getAllSpendTypes();
    }
}
