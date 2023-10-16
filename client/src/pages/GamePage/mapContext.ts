import React from "react";
import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";

export const MapContext = React.createContext<{
    myTeam: string,
    tileSize: number,
    map: Tile[],
    setMap: React.Dispatch<React.SetStateAction<Tile[]>>,
    currentTile: Tile | undefined,
}>({} as any);