import React from "react";
import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import {Team, TeamColorType, TeamsType} from "@pages/GamePage/classes/teams.ts";
import {IUser} from "@/store/auth/auth.slice.ts";
import {MultiplayerSyncRequest} from "@pages/GamePage/hooks/multiplayerTypes.ts";

export const MapContext = React.createContext<{
    myTeamColor: TeamColorType,
    setMyTeamColor: React.Dispatch<React.SetStateAction<TeamColorType | null>>,
    teams: TeamsType
    setTeams: React.Dispatch<React.SetStateAction<TeamsType>>,

    tileSize: number,

    setDeck: React.Dispatch<React.SetStateAction<Tile[]>>,

    map: Tile[],
    setMap: React.Dispatch<React.SetStateAction<Tile[]>>,
    currentTile: Tile | undefined,

    setInfoMessage: React.Dispatch<React.SetStateAction<string>>,
    setTooltip: React.Dispatch<React.SetStateAction<string>>,
    setTileInformation: React.Dispatch<React.SetStateAction<Tile | null>>,
    setUnitInformation: React.Dispatch<React.SetStateAction<Unit | null>>,

    endOfTurn: (updatedMap: Tile[], updatedTeams: TeamsType) => void;
}>({} as any);

export type GameStagesType = 'notStarted' | 'emptyMap' | 'takeTile' | 'tilePlaced' | 'unitPlaced' | 'scoring' | 'endOfTurn' | 'wait' | 'gameOver';
export const GameStageContext = React.createContext<{
    stage: GameStagesType,
    setStage: React.Dispatch<React.SetStateAction<GameStagesType>>,
}>({} as any);

export const MultiplayerContext = React.createContext<{
    roomId: string,
    joinRoom: (roomId: string, user: IUser) => void,
    ready: (roomId: string, data: any) => void,
    leaveRoom: (roomId: string) => void,
    passTheMove: (request: MultiplayerSyncRequest) => void
}>({} as any);


