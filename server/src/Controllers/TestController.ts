import { Request, Response, NextFunction } from 'express';
import { AbstractController } from "./AbstractController.js";

export class TestController extends AbstractController{

    public sayHello(req: Request, res: Response, next: NextFunction): void {
        res.json({ hello: 'world' });
    }

    // public getAllUsers(req: Request, res: Response, next: NextFunction): void {
    //     UserModel.find({}, (err, users) => {
    //         if (err) {
    //             this.handleError(res, err);
    //             return;
    //         }
    //         res.json(users);
    //     });
    // }
}