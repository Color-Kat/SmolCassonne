import WebSocket from "ws";
import {IUser} from "./types";

export interface WSClient extends WebSocket {
    roomId?: string;
    user?: IUser;
    team?: string;
}