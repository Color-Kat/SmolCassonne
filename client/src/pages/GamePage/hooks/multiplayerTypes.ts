import {IUser} from "@/store/auth/auth.slice.ts";
import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {Team, TeamsType} from "@pages/GamePage/classes/teams.ts";

export interface ISyncDataResponse {
    method: 'syncData';
    data: {
        isCurrentPlayer: boolean;
        map: Tile[];
        teams: TeamsType;
    }
}

export interface MultiPlayerRequest<T = undefined> {
    method?: string;
    roomId: string;
    user: IUser;

    data: T;
}

export type MultiplayerSyncRequest = MultiPlayerRequest<{
    map: Tile[],
    teams: { [key: string]: Team }
}>;
