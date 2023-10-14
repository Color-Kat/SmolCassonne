import {ITile} from "@pages/GamePage/classes/TilesDeck.ts";

export interface IMapTile extends ITile {
    coords: {
        x: number;
        y: number;
    };
}