import {WSClient} from "../types/multiplayer";

interface IRoom {
    roomId: string;
    isGameStarted: boolean
    playersCount: number;
}

const rooms: { [key: string]: IRoom } = {};

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

    private teams = ['blue', 'red', 'green', 'yellow'];

    /**
     * Create or update room.
     * Return false if player can't be connected to the room.
     *
     * @param roomId
     */
    public joinRoom(roomId: string): { result: boolean, message?: string } {
        // Create new room
        if (!rooms[roomId]) rooms[roomId] = {
            roomId,
            isGameStarted: false,
            playersCount: 0
        };

        // The game is already started
        if (rooms[roomId].isGameStarted) return {
            result: false,
            message: "Не удалось подключиться к комнате.\nИгра уже началась"
        };

        // The room is full
        if (rooms[roomId].playersCount + 1 > 4) return {
            result: false,
            message: "Не удалось подключиться к комнате.\nКомната заполнена"
        };
        rooms[roomId].playersCount++;

        console.log(`room ${roomId} - players: ${rooms[roomId].playersCount}`);

        return {result: true};
    }

    /**
     * Decrement players count in this room.
     * If there's no players, delete this room
     * @param roomId
     */
    public leaveRoom(roomId: string): void {
        if (rooms[roomId]) {
            rooms[roomId].playersCount--;

            console.log(`Disconnect room: ${roomId}, players left: ${rooms[roomId].playersCount}`);

            if (rooms[roomId].playersCount == 0) delete rooms[roomId];
        }
    }

    /**
     * Mark the room as game started.
     * @param roomId
     */
    public startGame(roomId: string): void {
        if (rooms[roomId]) rooms[roomId].isGameStarted = true;
    }

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
     * @param excludeTeam
     */
    public getTeamsList(clients: WSClient[], excludeTeam?: string): string[] {
        let teamsList = this.teams.slice(0, clients.length);

        if (excludeTeam)
            teamsList = teamsList.filter((teamColor) => teamColor !== excludeTeam)

        return teamsList;
    }

    /**
     * Return the next player id.
     * @param players
     */
    public getNextPlayerId(players: WSClient[]): string {
        let currentPlayerIndex = 0;

        for (let i = 0; i < players.length; i++) {
            if (players[i].isCurrentPlayer) {
                currentPlayerIndex = i;
                break;
            }
        }

        const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
        return players[nextPlayerIndex].user?.id ?? players[0].user?.id ?? "";
    }

    public checkGameResult(
        roomId: string,
        clients: WSClient[],
        deck: any[],
        teams: { [key: string]: { score: number, color: string, name: string } }
    ): { isOver: boolean, gameResult: any } {
        // The Game is over when there are no tiles in the deck
        let isOver = deck.length == 0;
        let gameResult = null;

        if (isOver) {
            // Sort teams by score
            // 0 - the first place is the winner
            gameResult = Object.values(teams)
                .sort((a, b) => b.score - a.score);

            delete rooms[roomId];
        }

        return {isOver, gameResult};
    }
}