import { Request, Response } from 'express';

class TestController {
    testEndpoint(req: Request, res: Response): void {
        res.status(200).json({ message: 'API is up and running' });
    }
}

export default TestController;
