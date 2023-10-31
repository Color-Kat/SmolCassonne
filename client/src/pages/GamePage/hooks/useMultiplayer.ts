import {useWebsocket} from "@hooks/useWebsocket.ts";
import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {Team, TeamColorType} from "@pages/GamePage/classes/teams.ts";
import React from "react";

interface IMultiplayerState {
    map: Tile[],
    setMap: React.Dispatch<React.SetStateAction<Tile[]>>;
    teams: {[key in TeamColorType]: Team};
    setTeams: React.Dispatch<React.SetStateAction<{[key in TeamColorType]: Team}>>;
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
        multiplayerState.setMap(data.map);
        multiplayerState.setTeams(data.teams);
    }

    // Connect to the websocket server
    const {sendToWebsocket} = useWebsocket('ws://localhost:5000/multiplayer', handleMultiplayerEvents);

    /**
     * Send the request to pass the move to the next player.
     * @param data
     */
    const passTheMove = (data: {
        map: Tile[],
        teams: {[key: string]: Team}
    }) => {
        console.log('passTheMove');
        sendToWebsocket({
            method: 'passTheMove',
            ...data
        });
    };

    /* ----------------------------- */
    return {
        passTheMove
    };
};