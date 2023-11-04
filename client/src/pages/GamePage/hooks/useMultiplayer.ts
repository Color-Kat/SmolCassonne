import {useWebsocket} from "@hooks/useWebsocket.ts";
import TilesDeck, {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {getTeamsByColors, Team, TeamColorType, TeamsType} from "@pages/GamePage/classes/teams.ts";
import React, {useContext} from "react";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import {TilesMap} from "@pages/GamePage/classes/TilesMap.ts";
import {IUser} from "@/store/auth/auth.slice.ts";
import {GameStageContext, GameStagesType, MapContext} from "@pages/GamePage/gameContext.ts";
import {ISyncDataResponse, MultiplayerSyncRequest} from "@pages/GamePage/hooks/multiplayerTypes.ts";

interface IMultiplayerState {
    setStage: React.Dispatch<React.SetStateAction<GameStagesType>>;

    setDeck: React.Dispatch<React.SetStateAction<Tile[]>>;

    setMyTeamColor: React.Dispatch<React.SetStateAction<TeamColorType | null>>;
    teams: TeamsType;
    setTeams: React.Dispatch<React.SetStateAction<TeamsType>>;

    map: Tile[],
    setMap: React.Dispatch<React.SetStateAction<Tile[]>>;

    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
}


export const useMultiplayer = (multiplayerState: IMultiplayerState) => {

    /**
     * Handle events from the server
     * @param method
     * @param response
     */
    const handleMultiplayerEvents = (method: string, response: any) => {
        switch (method) {
            case 'setMyTeam':
                setMyTeamHandler(response);
                break;

            case 'startGame':
                startGameHandler(response);
                break;

            case 'passTheMove':
                passTheMoveHandler(response);
                break;

            case 'message':
                showMessageHandler(response);
                break;

            case 'syncData':
                syncDataHandler(response);
                break;

            default:
                console.log('Unknown method: ', response.method);
                break;
        }
    };

    /* <<<<<<<<<<<<< Send events to the server >>>>>>>>>>>>>>>> */

    // Connect to the websocket server
    const {sendToWebsocket} = useWebsocket('ws://localhost:5000/multiplayer', handleMultiplayerEvents);

    /**
     * Send request to join user to the room with roomId
     * @param roomId
     * @param user
     */
    const joinRoom = (roomId: string, user: IUser) => {
        sendToWebsocket({
            method: 'joinRoom',
            roomId: roomId,
            user: user
        });
    };

    const startGame = (roomId: string) => {
        sendToWebsocket({
            method: 'startGame',
            roomId: roomId,
        });

        // multiplayerState.setStage('emptyMap');
    };

    const disconnect = (roomId: string, user: IUser) => {
        sendToWebsocket({
            method: 'disconnect',
            roomId: roomId,
            user: user
        });
    }

    /**
     * Send the request to pass the move to the next player.
     * @param request
     */
    const passTheMove = (request: MultiplayerSyncRequest) => {
        sendToWebsocket({
            roomId: request.roomId,
            method: 'passTheMove',
            user: request.user,
            data: request.data
        });
    };

    /* <<<<<<<<<<<<< Handle events from the server >>>>>>>>>>>>>>>> */

    const showMessageHandler = (response: { message: string }) => {
        multiplayerState.setInfoMessage(response.message);
    };

    /**
     * Set team of the player.
     * @param response
     */
    const setMyTeamHandler = (response: { team: string }) => {
        multiplayerState.setMyTeamColor(response.team as TeamColorType); // Set my team
    };

    const startGameHandler = (response: { teamsList: TeamColorType[] }) => {
        multiplayerState.setStage('emptyMap'); // Init empty map
        multiplayerState.setTeams(getTeamsByColors(response.teamsList)); // Set list of teams that are connected to this room
    };

    const passTheMoveHandler = (response: { isCurrentPlayer: boolean }) => {
        if (response.isCurrentPlayer) {
            // TODO карта на прогружается
            multiplayerState.setStage('takeTile');
        } else
            multiplayerState.setStage('wait');
    };

    /**
     * Update local game state by data from multiplayer server
     * @param response
     */
    const syncDataHandler = (response: ISyncDataResponse) => {
        // Hydrate deck object
        const deck: Tile[] = TilesDeck.hydrate(response.data.deck);

        // Hydrate teams object
        const teams = Team.hydrateTeams(response.data.teams);

        // Hydrate map object
        const map: IMultiplayerState['map'] = TilesMap.hydrate(response.data.map);

        // Sync map and teams objects
        multiplayerState.setDeck(deck);
        multiplayerState.setMap(map);
        multiplayerState.setTeams(teams);
    };

    /* ----------------------------- */
    return {
        joinRoom,
        startGame,
        passTheMove,
        disconnect
    };
};