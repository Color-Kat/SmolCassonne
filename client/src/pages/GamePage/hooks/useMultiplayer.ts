import {useWebsocket} from "@hooks/useWebsocket.ts";
import TilesDeck, {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {getTeamsByColors, ITeam, Team, TeamColorType, TeamsType} from "@pages/GamePage/classes/teams.ts";
import React, {useContext, useEffect, useState} from "react";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import {TilesMap} from "@pages/GamePage/classes/TilesMap.ts";
import {IUser} from "@/store/auth/auth.slice.ts";
import {GameStageContext, GameStagesType, MapContext} from "@pages/GamePage/gameContext.ts";
import {ISyncDataResponse, MultiplayerSyncRequest} from "@pages/GamePage/hooks/multiplayerTypes.ts";

export interface IRooms {
    [key: string]: {
        roomId: string;
        isGameStarted: boolean
        playersCount: number;
    }
}

interface IMultiplayerState {
    user: IUser;

    stage: GameStagesType;
    setStage: React.Dispatch<React.SetStateAction<GameStagesType>>;

    setDeck: React.Dispatch<React.SetStateAction<Tile[]>>;

    setMyTeamColor: React.Dispatch<React.SetStateAction<TeamColorType | null>>;
    teams: TeamsType;
    setTeams: React.Dispatch<React.SetStateAction<TeamsType>>;

    map: Tile[],
    setMap: React.Dispatch<React.SetStateAction<Tile[]>>;

    setWinners: React.Dispatch<React.SetStateAction<Team[]>>;

    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
}


export const useMultiplayer = (multiplayerState: IMultiplayerState) => {

    const [freeRooms, setFreeRooms] = useState<IRooms>({});


    /**
     * Handle events from the server
     * @param method
     * @param response
     */
    const handleMultiplayerEvents = (method: string, response: any) => {
        switch (method) {
            case 'message':
                showMessageHandler(response);
                break;

            case 'setRoomList':
                setRoomListHandler(response);
                break;

            case 'setMyTeam':
                setMyTeamHandler(response);
                break;

            case 'joinNewPlayer':
                joinNewPlayerHandler(response);
                break;

            case 'playerLeaveRoom':
                playerLeaveRoomHandler(response);
                break;

            case 'startGame':
                startGameHandler(response);
                break;

            case 'passTheMove':
                passTheMoveHandler(response);
                break;

            case 'syncData':
                syncDataHandler(response);
                break;

            case 'gameOver':
                gameOverHandler(response);
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
     * Try to connect user and setUserId to this connection
     */
    const connectUser = () => {
        try{
            sendToWebsocket({
                method: 'setUserId',
                userId: multiplayerState.user.id
            });
        } catch (e) {
            setTimeout( connectUser, 500 );
        }
    }

    /**
     * Update state with the list of free rooms.
     * @param response
     */
    const setRoomListHandler = (response: {rooms: IRooms}) => {
        setFreeRooms(response.rooms);
    }

    /**
     * Send request to join user to the room with roomId
     * @param roomId
     * @param user
     */
    const joinRoom = (roomId: string, user: IUser) => {
        if(!roomId) return false;

        sendToWebsocket({
            method: 'joinRoom',
            userId: multiplayerState.user.id,
            roomId: roomId,
            user: user
        });
    };

    const startGame = (roomId: string) => {
        sendToWebsocket({
            method: 'startGame',
            userId: multiplayerState.user.id,
            roomId: roomId,
        });

        // multiplayerState.setStage('emptyMap');
    };

    const leaveRoom = (roomId: string) => {
        sendToWebsocket({
            method: 'leaveRoom',
            userId: multiplayerState.user.id,
            roomId: roomId,
            user: multiplayerState.user
        });
    }

    /**
     * Send the request to pass the move to the next player.
     * @param request
     */
    const passTheMove = (request: MultiplayerSyncRequest) => {
        sendToWebsocket({
            method: 'passTheMove',
            userId: multiplayerState.user.id,
            roomId: request.roomId,
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

    const joinNewPlayerHandler = (response: { teamsList: TeamColorType[] }) => {
        multiplayerState.setTeams(getTeamsByColors(response.teamsList)); // Set list of teams that are connected to this room
    }

    const playerLeaveRoomHandler = (response: { teamsList: TeamColorType[] }) => {
        if(response.teamsList.length > 0)
            // Set list of teams that are still connected to this room
            multiplayerState.setTeams(getTeamsByColors(response.teamsList));
        else
            // There are no players in this room, leave from room
            multiplayerState.setMyTeamColor(null);
    }

    const startGameHandler = (response: { teamsList: TeamColorType[] }) => {
        multiplayerState.setStage('emptyMap'); // Init empty map

        // multiplayerState.setDeck()
        // multiplayerState.setTeams(getTeamsByColors(response.teamsList)); // Set list of teams that are connected to this room
    };

    const passTheMoveHandler = (response: { isCurrentPlayer: boolean }) => {
        // if(multiplayerState.stage === 'notStarted') return;

        if (response.isCurrentPlayer) {
            multiplayerState.setStage('takeTile');
        } else
            multiplayerState.setStage('wait');
    };

    /**
     * Update local game state by data from multiplayer server
     * @param response
     */
    const syncDataHandler = (response: ISyncDataResponse) => {
        // if(multiplayerState.stage === 'notStarted') return;

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

    const gameOverHandler = (response: { gameResult: ITeam[] }) => {
        const winners = response.gameResult.map((team) => Team.hydrate(team));
        multiplayerState.setWinners(winners);
        multiplayerState.setStage('gameOver');
    }

    /* ----------------------------- */

    return {
        connectUser,
        freeRooms,
        joinRoom,
        startGame,
        passTheMove,
        leaveRoom
    };
};