import { Request, Response } from 'express';
import SpendTypeService from '../services/spend_type';

export default class SpendTypeController {
    // get all spend types
    static async getAllSpendTypes(req: Request, res: Response) {
        try {
            const spendTypes = await SpendTypeService.getAllSpendTypes();
            return res.json(spendTypes);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // update spend type by id
    // delete spend type
}
