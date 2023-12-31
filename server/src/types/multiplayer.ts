import WebSocket from "ws";
import {IUser} from "./types";

export interface WSClient extends WebSocket {
    userId?: string;
    roomId?: string;
    user?: IUser;
    team?: string;
    isCurrentPlayer?: boolean;
}