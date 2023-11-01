import {useWebsocket} from "@hooks/useWebsocket.ts";
import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {Team, TeamColorType} from "@pages/GamePage/classes/teams.ts";
import React from "react";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import {TilesMap} from "@pages/GamePage/classes/TilesMap.ts";

interface IMultiplayerState {
    map: Tile[],
    setMap: React.Dispatch<React.SetStateAction<Tile[]>>;
    teams: { [key in TeamColorType]: Team };
    setTeams: React.Dispatch<React.SetStateAction<{ [key in TeamColorType]: Team }>>;
}

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

    /**
     * Send the request to pass the move to the next player.
     * @param data
     */
    const passTheMove = (data: {
        map: Tile[],
        teams: { [key: string]: Team }
    }) => {
        console.log('pass', data.teams);
        sendToWebsocket({
            method: 'passTheMove',
            map: data.map,
            teams: data.teams
        });
    };

    /* ----------------------------- */
    return {
        passTheMove
    };
};