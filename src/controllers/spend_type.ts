import { Request, Response } from 'express';
import SpendTypeService from '../services/spend_type';
import ResponseHelper from '../helpers/response';

export default class SpendTypeController {
    // get all spend types
    static async getAllSpendTypes(_req: Request, res: Response) {
        try {
            const spendTypes = await SpendTypeService.getAllSpendTypes();
            return ResponseHelper.success(res, spendTypes);
        } catch (error) {
            return ResponseHelper.error(res, error);
        }
    }

    // update spend type by id
    // delete spend type
}
