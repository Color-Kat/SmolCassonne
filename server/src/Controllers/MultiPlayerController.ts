import {AbstractController} from "./AbstractController.js";
import {WebsocketRequestHandler, Instance as WSServerInstance} from "express-ws";
import {IUser} from "../types/types";
import {MultiplayerService} from "../Services/MultiplayerService.js";
import {WSClient} from "../types/multiplayer";

// Common Multiplayer request
interface MultiPlayerRequest<T = undefined> {
    roomId: string;
    method: string;
    user: IUser;

    data: T;
}

type MultiplayerSyncRequest = MultiPlayerRequest<{
    map: [];
    teams: any[];
}>;

/**
 * This controller is responsible for multiplayer realization.
 * Here must not be a logic, the logic is placed in the multiplayer service.
 * This controller just provides an interface between request and multiplayer service.
 * This controller must get data from ws request and send data using ws. All logic is in the multiplayer service.
 */
export class MultiPlayerController extends AbstractController {
    private ws: WSClient | null = null;

    // /**
    //  * Websocket server instance
    //  * @private
    //  */
    // private wsServer;
    //
    /**
     * All websocket connections
     * @private
     */
    private aWss;

    private multiplayerService: MultiplayerService;

    constructor(wsServer: WSServerInstance) {
        super();

        // this.wsServer = wsServer;
        this.aWss = wsServer.getWss();

        this.multiplayerService = new MultiplayerService();
    }

    /**
     * Parse data from ws request and run endpoint function by method.
     *
     * @param ws
     * @param req
     */
    public initWebsocket: WebsocketRequestHandler = (ws, req): void => {
        console.log('Client connected to the websocket server');
        this.ws = ws;

        this.ws.on('message', (message: string) => {
            const request: MultiPlayerRequest<any> = JSON.parse(message);
            // console.log(data);

            switch (request.method) {
                case 'joinRoom':
                    this.joinRoomHandler(request);
                    break;

                case 'startGame':
                    this.startGameHandler(request);
                    break;

                case 'passTheMove':
                    this.passTheMoveHandler(request);
                    break;

                default:
                    console.log('Unknown method: ', request.method);
                    break;
            }
        });
    };

    /**
     * Broadcast data from callback to all clients of this roomId.
     *
     * @param roomId
     * @param callback
     */
    private broadcast = (roomId: string, callback: (client: WSClient) => {}) => {
        this.aWss.clients.forEach((client: WSClient) => {
            if (client.roomId != roomId) return; // Skip other rooms

            const result = callback(client);

            // Send a message
            client.send(JSON.stringify(result));
        });
    };

    /**
     * Return array of the players from the roomId room.
     * @param roomId
     * @private
     */
    private getRoomPlayers(roomId: string): WSClient[] {
        return [...this.aWss.clients].filter((client: WSClient) => client.roomId == roomId);
    }

    /**
     * Send a message about new player to all clients of this roomId
     * And initiate an assigning a team for the new player.
     *
     * @param request
     */
    public joinRoomHandler(request: MultiPlayerRequest): void {
        if (!this.ws) return;

        // Send a message about new player
        this.broadcast(request.roomId, (client: WSClient) => ({
            method: 'message',
            message: "Новый игрок подключился к комнате " + request.roomId
        }));

        this.assignTeam(request);
    }

    public startGameHandler(request: MultiPlayerRequest): void {
        if (!this.ws) return;

        // Send a message about new player
        this.broadcast(request.roomId, (client: WSClient) => ({
            method: 'startGame'
        }));

        // Player, who started the game, moves first
        this.broadcast(request.roomId, (client: WSClient) => {

            // Sync data between all players
            return {
                isCurrentPlayer: this.ws?.user?.id == client.user?.id,
                method: 'passTheMove',
            };
        });
    }

    /**
     * Assign a team for the new player.
     * Save user data for this ws connection,
     * And send setMyTeam event to this player.
     *
     * @param request
     */
    public assignTeam(request: MultiPlayerRequest): void {
        if (!this.ws) return;
        const roomId = request.roomId;

        // Get team for just connected player
        const team = this.multiplayerService.getFreeTeam(this.getRoomPlayers(roomId));

        // Save user data for this ws connection
        this.ws.roomId = request.roomId;
        this.ws.user = request.user;
        this.ws.team = team;
        this.ws.isCurrentPlayer = false;

        // Send to just connected user his team
        this.ws.send(JSON.stringify({
            method: 'setMyTeam',
            team: this.ws.team
        }));
    }

    /**
     * Pass the turn to the next player.
     * Set isCurrentPlayer = false for all players besides the new active player.
     *
     * @param request
     */
    public passTheMoveHandler = (request: MultiplayerSyncRequest): void => {
        if (!this.ws) return;
        const roomId = request.roomId;

        // Get the next player user id
        const activePlayerId = this.multiplayerService.getNextPlayerId(this.getRoomPlayers(roomId));

        this.broadcast(roomId, (client: WSClient) => {
            // Pass the turn
            if(client.user?.id == activePlayerId) client.isCurrentPlayer = true;

            // Sync data between all players
            return {
                isCurrentPlayer: client.user?.id == activePlayerId,
                method: 'passTheMove',
            };
        });

        this.syncDataHandler(request);
    };

    /**
     *
     * @param request
     */
    public syncDataHandler = (request: MultiplayerSyncRequest): void => {
        if (!this.ws) return;
        const roomId = request.roomId;

        this.broadcast(roomId, (client: WSClient) => {

            return {
                data: request.data,
                method: 'syncData',
            };
        });
    }
}