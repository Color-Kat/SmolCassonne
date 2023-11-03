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

    /**
     * Return the first free team color.
     * @param players
     */
    public getFreeTeam(players: WSClient[]): string {
        // List of free teams (blue, red, etc.)
        let freeTeams = this.teams;

        // Iterate all players of this room
        players.forEach((player) => {
            // Delete already taken team names
            freeTeams = freeTeams.filter((team) => team != player.team)
        });

        return freeTeams[0];
    }

    /**
     * Return the list of teams that are connected to this room.
     * @param clients
     */
    public getTeamsList(clients: Set<WSClient>): string[] {
        return this.teams.slice(0, clients.size);
    }

    /**
     * Return the next player id.
     * @param players
     */
    public getNextPlayerId(players: WSClient[]): string {
        let currentPlayerIndex = 0;

        for (let i = 0; i < players.length; i++) {
            if(players[i].isCurrentPlayer) {
                currentPlayerIndex = i;
                break;
            }
        }

        const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
        return players[nextPlayerIndex].user?.id ?? "";
    }

}