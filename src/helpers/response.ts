import { Response } from 'express';

interface ResponseModel<T = unknown> {
    success: boolean;

    message: string;
    data?: T;
    error?: ErrorDetail;
}

interface ErrorDetail {
    code?: number;
    details?: any;
}
export default class ResponseHelper {
    static success<T>(
        res: Response,
        data?: T,
        message: string = '',
        statusCode: number = 200
    ) {
        const response: ResponseModel<T> = {
            success: true,
            message,
            data,
        };
        res.status(statusCode).json(response);
    }

    static created<T>(
        res: Response,
        data?: T,
        message: string = 'Resource created successfully'
    ) {
        const response: ResponseModel<T> = {
            success: true,
            message,
            data,
        };
        res.status(201).json(response);
    }

    static noContent(res: Response, message: string = 'No content') {
        const response: ResponseModel = {
            success: true,
            message,
        };
        res.status(204).json(response);
    }

    static error(
        res: Response,
        error?: any,
        statusCode: number = 500,
        message: string = 'An error occurred. Please try again later.'
    ) {
        const response: ResponseModel = {
            success: false,
            message,
            error: {
                code: statusCode,
                details:
                    error ??
                    (statusCode == 500 ? 'internal server error' : undefined),
            },
        };
        res.status(statusCode).json(response);
    }
}
