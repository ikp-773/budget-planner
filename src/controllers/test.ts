import { Request, Response } from 'express';
import ResponseHelper from '../helpers/response';
import packageInfo from '../../package.json';

const startTime = Date.now();

export default class TestController {
    static testEndpoint(req: Request, res: Response): void {
        const uptime = Math.floor((Date.now() - startTime) / 1000);
        const data = {
            version: packageInfo.version,
            uptime: `${uptime} seconds`,
            timeStamp: new Date(Date.now()),
        };
        return ResponseHelper.success(
            res,
            data,
            'API is up and running successfully'
        );
    }
}
