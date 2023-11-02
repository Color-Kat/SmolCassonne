import {Instance as WSServerInstance} from "express-ws";
import {WSClient} from "../types/multiplayer";
import WebSocket from "ws";

export class MultiplayerService {
    // /**
    //  * Websocket server instance
    //  * @private
    //  */
    // private wsServer;
    //
    // /**
    //  * All websocket connections
    //  * @private
    //  */
    // private aWss;

    constructor(
        // wsServer: WSServerInstance
    ) {
        // this.wsServer = wsServer;
        // this.aWss = this.wsServer.getWss();
    }

    private teams = ['blue', 'red', 'green'];

    public joinRoom(roomId: string, players: WSClient[]): string {
        // List of free teams (blue, red, etc.)
        let freeTeams = this.teams;

        // Iterate all players of this room
        players.forEach((player) => {
            // Delete already taken team names
            freeTeams = freeTeams.filter((team) => team != player.team)
        });

        return freeTeams[0];
    }

    public passTheMove(): void {
    }

}