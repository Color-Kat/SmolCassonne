import {AbstractController} from "./AbstractController.js";
import {WebsocketRequestHandler, Instance as WSServerInstance} from "express-ws";
import {IUser} from "../types/types";
import {MultiplayerService} from "../Services/MultiplayerService.js";
import {WSClient} from "../types/multiplayer";

// Common Multiplayer request
interface MultiPlayerRequest<T = undefined> {
    userId: string;
    roomId: string;
    method: string;
    user?: IUser;

    data: T;
}

type MultiplayerSyncRequest = MultiPlayerRequest<{
    deck: any[]
    map: any[];
    teams: { [key: string]: any };
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

    /* ------- Helpers ------- */
    /**
     * Broadcast data from callback to all clients of this roomId.
     *
     * @param roomId
     * @param callback
     */
    private broadcast = (roomId: string, callback: (client: WSClient) => {}) => {
        this.aWss.clients.forEach((client: WSClient) => {
            if (client.roomId !== roomId) return; // Skip other rooms

            const result = callback(client);

            // Send a message
            client.send(JSON.stringify(result));
        });
    };

    /**
     * Return websocket client by id.
     * @param userId
     */
    private getClientById = (userId: string): WSClient | null => {
        const client = Array.from(this.aWss.clients).find((client: WSClient) => {
            return client.userId == userId;
        }) ?? null;

        return client;
    }

    private sendToUser (userId: string, data: any){
        const userWs = this.getClientById(userId);

        userWs?.send(JSON.stringify(data));
    }

    /**
     * Return array of the players from the roomId room.
     * @param roomId
     * @private
     */
    private getRoomPlayers(roomId: string): WSClient[] {
        return [...this.aWss.clients].filter((client: WSClient) => client.roomId == roomId);
    }

    /* ------- Helpers ------- */

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

            switch (request.method) {
                case 'setUserId':
                    this.setUserIdHandler(request);
                    break;

                case 'joinRoom':
                    this.joinRoomHandler(request);
                    break;

                case 'startGame':
                    this.startGameHandler(request);
                    break;

                case 'leaveRoom':
                    this.leaveRoomHandler(request);
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

    /* ------- Handlers ------- */

    public setUserIdHandler(request: MultiPlayerRequest): void {
        if(!this.ws) return;
        this.ws.userId = request.userId;
    }

    /**
     * Send a message about new player to all clients of this roomId
     * And initiate an assigning a team for the new player.
     *
     * @param request
     */
    public joinRoomHandler(request: MultiPlayerRequest): void {
        if (!this.ws) return;

        const {result, message} = this.multiplayerService.joinRoom(request.roomId);

        if (result) {
            // Send a message about new player
            this.broadcast(request.roomId, (client: WSClient) => {
                return {
                    method: 'message',
                    message: "Новый игрок подключился к комнате " + request.roomId
                }
            });

            this.initPlayer(request);

            this.joinNewPlayer(request);
            // TODO если второй игрок подключается к комнате, то он не переходит на второй экрaн (не получает запрос)
        } else {
            // User can't join this room
            this.ws.send(JSON.stringify({
                method: 'message',
                message: message ?? 'Не удалось подключиться к комнате ' + request.roomId
            }));
        }
    }

    /**
     * Init player.
     * Save user data for this ws connection,
     * Assign a team for the new player.
     * And send setMyTeam event to this player.
     *
     * @param request
     */
    public initPlayer(request: MultiPlayerRequest): void {
        const client = this.getClientById(request.userId);
        if (!client) return;
        const roomId = request.roomId;

        // Get team for just connected player
        const team = this.multiplayerService.getFreeTeam(this.getRoomPlayers(roomId));

        // Save user data for this ws connection
        client.roomId = request.roomId;
        client.user = request.user;
        client.team = team;
        client.isCurrentPlayer = false;

        // Send to just connected user his team
        client.send(JSON.stringify({
            method: 'setMyTeam',
            team: client.team
        }));
    }

    public joinNewPlayer(request: MultiPlayerRequest): void {
        const roomId = request.roomId;

        // Get list of teams that are connected to this room
        const teamsList = this.multiplayerService.getTeamsList(this.getRoomPlayers(roomId));

        // Send a message about new player
        this.broadcast(roomId, (client: WSClient) => ({
            method: 'joinNewPlayer',
            teamsList
        }));
    }

    /**
     * Send event "startGame" with list of teams that are connected to this room.
     * Send event "passTheMove" to the player, who started this game, with isCurrentPlayer property.
     * @param request
     */
    public startGameHandler(request: MultiPlayerRequest): void {
        // Mark this room as game started
        this.multiplayerService.startGame(request.roomId);

        // Send a message about new player
        this.broadcast(request.roomId, (client: WSClient) => ({
            method: 'startGame',
        }));

        // Pass the move to the player, who started this game
        setTimeout(() => this.passTheFirstMoveHandler(request), 250);
    }

    /**
     * Send message about player disconnect
     * and remove him from this room.
     * @param request
     */
    public leaveRoomHandler(request: MultiPlayerRequest): void {
        const client = this.getClientById(request.userId);
        if (!client) return;
        const roomId = request.roomId;

        // Pass the turn to the next player
        // before the player leaves the room
        this.passTheMoveHandler(request as any, false);

        // Delete data about current game of the client
        delete client.roomId;
        delete client.user;
        delete client.team;
        delete client.isCurrentPlayer;

        // Send a message to all users
        this.broadcast(roomId, (client: WSClient) => ({
            method: 'message',
            message: `Пользователь ${request.user?.name} покинул игру`
        }));

        // Update data about rooms
        this.multiplayerService.leaveRoom(roomId);

        // Get teamsList after leaving player
        const teamsList = this.multiplayerService.getTeamsList(
            this.getRoomPlayers(roomId),
            client.team
        );

        // Send a message about new teamsList
        this.broadcast(roomId, (client: WSClient) => ({
            method: 'playerLeaveRoom',
            teamsList
        }));
    }

    /**
     * Pass the move to the player in this.ws (the player, who started this game).
     *
     * @param request
     */
    public passTheFirstMoveHandler = (request: MultiPlayerRequest): void => {
        // Player, who started the game, moves first
        this.broadcast(request.roomId, (client: WSClient) => {
            client.isCurrentPlayer = this.ws?.user?.id == client.user?.id;

            // Sync data between all players
            return {
                isCurrentPlayer: this.ws?.user?.id == client.user?.id,
                method: 'passTheMove',
            };
        });
    };

    /**
     * Pass the turn to the next player.
     * Set isCurrentPlayer = false for all players besides the new active player.
     *
     * @param request
     * @param syncData
     */
    public passTheMoveHandler = (request: MultiplayerSyncRequest, syncData: boolean = true): void => {
        const roomId = request.roomId;

        // Get the next player user id
        const nextPlayerId = this.multiplayerService.getNextPlayerId(this.getRoomPlayers(roomId));

        this.broadcast(roomId, (client: WSClient) => {
            // Pass the turn
            client.isCurrentPlayer = client.user?.id == nextPlayerId;

            // Sync data between all players
            return {
                isCurrentPlayer: client.user?.id == nextPlayerId,
                method: 'passTheMove',
            };
        });

        if(syncData)
            this.syncDataHandler(request);
    };

    /**
     * Sync data between all players connected to this room.
     * @param request
     */
    public syncDataHandler = (request: MultiplayerSyncRequest): void => {
        const roomId = request.roomId;

        // Sync data to all players
        this.broadcast(roomId, (client: WSClient) => {
            return {
                data: request.data,
                method: 'syncData',
            };
        });

        const {isOver, gameResult} = this.multiplayerService.checkGameResult(
            roomId,
            this.getRoomPlayers(roomId),
            request.data.deck,
            request.data.teams
        );

        // Game is over
        if (isOver) {
            this.broadcast(roomId, (client: WSClient) => ({
                gameResult: gameResult,
                method: 'gameOver',
            }));
        }
    }
    /* ------- Handlers ------- */
}