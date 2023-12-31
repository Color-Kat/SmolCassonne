import {IUser} from "@/store/auth/auth.slice.ts";
import TilesDeck, {ITile, Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {ITeam, Team, TeamColorType, TeamsType} from "@pages/GamePage/classes/teams.ts";

export interface ISyncDataResponse {
    method: 'syncData';
    data: {
        isCurrentPlayer: boolean;
        deck: ITile[];                            // (not hydrated)
        map: ITile[];                             // (not hydrated)
        teams: { [key in TeamColorType]: ITeam }; // (not hydrated)
    }
}

export interface MultiPlayerRequest<T = undefined> {
    method?: string;
    roomId: string;
    user: IUser;

    data: T;
}

export type MultiplayerSyncRequest = MultiPlayerRequest<{
    deck: Tile[];
    map: Tile[],
    teams: { [key: string]: Team }
}>;
