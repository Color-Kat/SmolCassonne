import { Request, Response, NextFunction } from 'express';
import {AbstractController} from "./AbstractController.js";
import WebSocket from "ws";

interface IMultiPlayerData {
    method: string;
    map: any[];
    teams: any[];
}

export class MultiPlayerController extends AbstractController {
    private ws: WebSocket|null = null;

    public initWebsocket = (ws: WebSocket, req: Request): void => {
        console.log('Websocket connected');
        this.ws = ws

        // ws.send('Hi, client');

        this.ws.on('message', (message: string) => {
            const data: IMultiPlayerData = JSON.parse(message);
            console.log(data);

            switch (data.method) {
                case 'passTheMove':
                    // TODO
                    this.passTheMove(data);
                    break;

                default:
                    console.log('Unknown method: ', data.method);
                    break;
            }
        })
        // res.json({ hello: 'world' });
    }

    public passTheMove = (data: IMultiPlayerData): void => {
        if(!this.ws) return;

        this.ws.send(JSON.stringify({
            ...data,
            method: 'syncData',
        }))
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