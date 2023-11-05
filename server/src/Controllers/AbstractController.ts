import { Response } from 'express';

export abstract class AbstractController {
    protected handleError(res: Response, err: any): void {
        console.error(err);
        res.status(500).json({ error: 'Что-то пошло не так' });
    }
}