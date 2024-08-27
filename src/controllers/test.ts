import { Request, Response } from 'express';
import ResponseHelper from '../helpers/response';

export default class TestController {
    static testEndpoint(req: Request, res: Response): void {
        return ResponseHelper.noContent(
            res,
            'API is up and running successfully'
        );
    }
}
