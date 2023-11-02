import { Request, Response, NextFunction } from 'express';
import {AbstractController} from "./AbstractController.js";
import WebSocket from "ws";
import {WebsocketRequestHandler, Instance as WSServerInstance} from "express-ws";
import {IUser} from "../types";

// Common Multiplayer request
interface MultiPlayerRequest<T = undefined> {
    roomId: string;
    method: string;
    user: IUser;

    data: T;
}

type MultiplayerSyncRequest = MultiPlayerRequest<{
    map: any[];
    teams: any[];
}>;

interface WSResponse extends WebSocket {
    roomId?: string;
    user?: IUser;
    team?: string;
}

export class MultiPlayerController extends AbstractController {
    private ws: WSResponse|null = null;

    /**
     * Websocket server instance
     * @private
     */
    private wsServer;

    /**
     * All websocket connections
     * @private
     */
    private aWss;

    private teams = ['blue', 'red', 'green'];

    constructor(wsServer: WSServerInstance) {
        super();
        this.wsServer = wsServer;
        this.aWss = this.wsServer.getWss();
    }

    public initWebsocket: WebsocketRequestHandler = (ws, req): void => {
        console.log('Websocket connected');
        this.ws = ws;

        // ws.send('Hi, client');

        this.ws.on('message', (message: string) => {
            const data: MultiPlayerRequest<any> = JSON.parse(message);
            console.log(data);

            switch (data.method) {
                case 'joinRoom':
                    this.joinRoomHandler(data);
                    break;

                case 'passTheMove':
                    this.passTheMoveHandler(data);
                    break;

                default:
                    console.log('Unknown method: ', data.method);
                    break;
            }
        })
        // res.json({ hello: 'world' });
    }

    /**
     * Save data about new player.
     * Send a message about new player to all clients of this roomId
     * Generate team data for new player and send it.
     *
     * @param data
     */
    public joinRoomHandler(data: MultiPlayerRequest): void {
        if(!this.ws) return;

        // List of free teams (blue, red, etc.)
        let freeTeams = this.teams;

        // Iterate all players of this room
        this.aWss.clients.forEach((client: WSResponse) => {
            if(client.roomId != data.roomId) return; // Skip other rooms

            // Delete already taken team names
            freeTeams = freeTeams.filter((team) => team != client.team)

            // Send a message about new player
            client.send(JSON.stringify({
                method: 'message',
                message: "Новый игрок подключился к комнате " + data.roomId
            }));
        })

        // Save user data for this ws connection
        this.ws.roomId = data.roomId;
        this.ws.user = data.user;
        this.ws.team = freeTeams[0];

        // Send to just connected user his team
        this.ws.send(JSON.stringify({
            method: 'setTeam',
            team: this.ws.team
        }))
    }

    // private broadcastConnection(data: IMultiPlayerData): void {
    //     if(!this.ws) return;
    //
    //
    // }

    public passTheMoveHandler = (request: MultiplayerSyncRequest): void => {
        if(!this.ws) return;

        this.ws.send(JSON.stringify({
            ...request.data,
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