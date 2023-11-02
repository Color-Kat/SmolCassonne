import {useWebsocket} from "@hooks/useWebsocket.ts";
import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {Team, TeamColorType} from "@pages/GamePage/classes/teams.ts";
import React from "react";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import {TilesMap} from "@pages/GamePage/classes/TilesMap.ts";
import {IUser} from "@/store/auth/auth.slice.ts";

interface IMultiplayerState {
    map: Tile[],
    setMap: React.Dispatch<React.SetStateAction<Tile[]>>;
    teams: { [key in TeamColorType]: Team };
    setTeams: React.Dispatch<React.SetStateAction<{ [key in TeamColorType]: Team }>>;
}

interface MultiPlayerRequest<T = undefined> {
    roomId: string;
    user: IUser;
    method?: string;

    data: T;
}

type MultiplayerSyncRequest = MultiPlayerRequest<{
    map: any[];
    teams: any[];
}>;


export const useMultiplayer = (multiplayerState: IMultiplayerState) => {
    /**
     * Handle events from the server
     * @param method
     * @param data
     */
    const handleMultiplayerEvents = (method: string, data: any) => {
        switch (method) {
            case 'syncData':
                syncData(data);
                break;

            default:
                console.log('Unknown method: ', data.method);
                break;
        }
    };

    /* <<<<<<<<<<<<< Handle events from the server >>>>>>>>>>>>>>>> */

    /**
     * Update local game state by data from multiplayer server
     * @param data
     */
    const syncData = (data: IMultiplayerState) => {
        // Hydrate teams object
        const teams = Team.hydrateTeams(data.teams);

        // Hydrate map object
        const map: IMultiplayerState['map'] = TilesMap.hydrate(data.map);

        multiplayerState.setMap(map);
        multiplayerState.setTeams(teams);
    };

    // Connect to the websocket server
    const {sendToWebsocket} = useWebsocket('ws://localhost:5000/multiplayer', handleMultiplayerEvents);


    /* <<<<<<<<<<<<< Send events to the server >>>>>>>>>>>>>>>> */

    const joinRoom = (roomId: string, user: IUser) => {
        sendToWebsocket({
            roomId: roomId,
            method: 'joinRoom',
            user: user
        });
    }

    /**
     * Send the request to pass the move to the next player.
     * @param request
     */
    const passTheMove = (request: MultiPlayerRequest<{
        map: Tile[],
        teams: { [key: string]: Team }
    }>) => {
        console.log('passTheMove', request);
        sendToWebsocket({
            roomId: request.roomId,
            method: 'passTheMove',
            user: request.user,
            data: request.data
        });
    };

    /* ----------------------------- */
    return {
        joinRoom,
        passTheMove
    };
};