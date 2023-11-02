import React from "react";
import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import {Team, TeamColorType, TeamsType} from "@pages/GamePage/classes/teams.ts";

export const MapContext = React.createContext<{
    myTeamColor: TeamColorType,
    teams: {[key in TeamColorType]: Team}
    setTeams: React.Dispatch<React.SetStateAction<{[key in TeamColorType]: Team}>>,

    tileSize: number,

    map: Tile[],
    setMap: React.Dispatch<React.SetStateAction<Tile[]>>,
    currentTile: Tile | undefined,

    setInfoMessage: React.Dispatch<React.SetStateAction<string>>,
    setTooltip: React.Dispatch<React.SetStateAction<string>>,
    setTileInformation: React.Dispatch<React.SetStateAction<Tile | null>>,
    setUnitInformation: React.Dispatch<React.SetStateAction<Unit | null>>,

    endOfTurn: (updatedMap: Tile[], updatedTeams: TeamsType) => void;
}>({} as any);

export type GameStagesType = 'emptyMap' | 'takeTile' | 'tilePlaced' | 'unitPlaced' | 'scoring' | 'endOfTurn' | 'wait';
export const GameStageContext = React.createContext<{
    stage: GameStagesType,
    setStage: React.Dispatch<React.SetStateAction<GameStagesType>>,
}>({} as any);

