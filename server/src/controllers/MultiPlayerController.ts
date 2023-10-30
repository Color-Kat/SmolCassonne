import { Request, Response, NextFunction } from 'express';
import {AbstractController} from "./AbstractController.js";

export class MultiPlayerController extends AbstractController {

    public initWebsocket(ws: any, req: Request): void {
        console.log('Websocket connected');
        // res.json({ hello: 'world' });
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