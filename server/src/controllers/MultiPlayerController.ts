import { Request, Response, NextFunction } from 'express';
import {AbstractController} from "./AbstractController.js";
import WebSocket from "ws";

interface IMultiPlayerData {
    method: string;
    map: any[];
    teams: any[];
}

export class MultiPlayerController extends AbstractController {

    public initWebsocket(ws: WebSocket, req: Request): void {
        console.log('Websocket connected');

        // ws.send('Hi, client');

        ws.on('message', (message: string) => {
            const data: IMultiPlayerData = JSON.parse(message);
            console.log(data);

            switch (data.method) {
                case 'passTheMove':
                    this.passTheMove(data);
                    break;

                default:
                    console.log('Unknown method: ', data.method);
                    break;
            }
        })
        // res.json({ hello: 'world' });
    }

    public passTheMove(data: IMultiPlayerData): void {
        console.log('passTheMove: ', data);
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