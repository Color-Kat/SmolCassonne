import { Request, Response, NextFunction } from 'express';
import {AbstractController} from "./AbstractController.js";
import WebSocket from "ws";

export class MultiPlayerController extends AbstractController {

    public initWebsocket(ws: WebSocket, req: Request): void {
        console.log('Websocket connected');

        ws.send('Hi, client');

        ws.on('message', (msg) => {
            console.log(msg);
        })
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