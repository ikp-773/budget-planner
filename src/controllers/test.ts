import { Request, Response } from 'express';

export default class TestController {
    static testEndpoint(req: Request, res: Response): void {
        res.status(200).json({ message: 'API is up and running' });
    }
}
