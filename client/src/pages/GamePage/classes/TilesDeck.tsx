import {shuffle} from '@/utils/arrays';
import {Unit} from "@pages/GamePage/classes/Units.ts";
import React from "react";

export interface ITile {
    id: number;
    design: string;
    pennant: boolean;
    borders: ('field' | 'road' | 'wall' | 'water' | 'city')[];
    rotation: number;
    units: (Unit | null)[];
    coords: { x: number, y: number };
}

export interface IMapTile extends ITile {
    coords: {
        x: number;
        y: number;
    };
}

class TilesDeck {
    private deck = ([
        {id: 1, design: "A", borders: ['field', 'field', 'road', 'field'], pennant: false, rotation: 0},
        {id: 2, design: "A", borders: ['field', 'field', 'road', 'field'], pennant: false, rotation: 0},
        {id: 3, design: "B", borders: ['field', 'field', 'field', 'field'], pennant: false, rotation: 0},
        {id: 4, design: "B", borders: ['field', 'field', 'field', 'field'], pennant: false, rotation: 0},
        {id: 5, design: "B", borders: ['field', 'field', 'field', 'field'], pennant: false, rotation: 0},
        {id: 6, design: "B", borders: ['field', 'field', 'field', 'field'], pennant: false, rotation: 0},
        {id: 7, design: "C", borders: ['city', 'city', 'city', 'city'], pennant: true, rotation: 0},
        {id: 8, design: "D", borders: ['city', 'road', 'field', 'road'], pennant: false, rotation: 0},
        {id: 9, design: "D", borders: ['city', 'road', 'field', 'road'], pennant: false, rotation: 0},
        {id: 10, design: "D", borders: ['city', 'road', 'field', 'road'], pennant: false, rotation: 0},
        {id: 11, design: "E", borders: ['city', 'field', 'field', 'field'], pennant: false, rotation: 0},
        {id: 12, design: "E", borders: ['city', 'field', 'field', 'field'], pennant: false, rotation: 0},
        {id: 13, design: "E", borders: ['city', 'field', 'field', 'field'], pennant: false, rotation: 0},
        {id: 14, design: "E", borders: ['city', 'field', 'field', 'field'], pennant: false, rotation: 0},
        {id: 15, design: "E", borders: ['city', 'field', 'field', 'field'], pennant: false, rotation: 0},
        {id: 16, design: "F", borders: ['field', 'city', 'field', 'city'], pennant: true, rotation: 0},
        {id: 17, design: "F", borders: ['field', 'city', 'field', 'city'], pennant: true, rotation: 0},
        {id: 18, design: "G", borders: ['field', 'city', 'field', 'city'], pennant: false, rotation: 0},
        {id: 19, design: "H", borders: ['field', 'city', 'field', 'city',], pennant: false, rotation: 0},
        {id: 20, design: "H", borders: ['field', 'city', 'field', 'city'], pennant: false, rotation: 0},
        {id: 21, design: "H", borders: ['field', 'city', 'field', 'city'], pennant: false, rotation: 0},
        {id: 22, design: "I", borders: ['city', 'field', 'field', 'city'], pennant: false, rotation: 0},
        {id: 23, design: "I", borders: ['city', 'field', 'field', 'city'], pennant: false, rotation: 0},
        {id: 24, design: "J", borders: ['city', 'road', 'road', 'field'], pennant: false, rotation: 0},
        {id: 25, design: "J", borders: ['city', 'road', 'road', 'field'], pennant: false, rotation: 0},
        {id: 26, design: "J", borders: ['city', 'road', 'road', 'field'], pennant: false, rotation: 0},
        {id: 27, design: "K", borders: ['city', 'field', 'road', 'road'], pennant: false, rotation: 0},
        {id: 28, design: "K", borders: ['city', 'field', 'road', 'road'], pennant: false, rotation: 0},
        {id: 29, design: "K", borders: ['city', 'field', 'road', 'road'], pennant: false, rotation: 0},
        {id: 30, design: "L", borders: ['city', 'road', 'road', 'road'], pennant: false, rotation: 0},
        {id: 31, design: "L", borders: ['city', 'road', 'road', 'road'], pennant: false, rotation: 0},
        {id: 32, design: "L", borders: ['city', 'road', 'road', 'road'], pennant: false, rotation: 0},
        {id: 33, design: "M", borders: ['city', 'field', 'field', 'city'], pennant: true, rotation: 0},
        {id: 34, design: "M", borders: ['city', 'field', 'field', 'city'], pennant: true, rotation: 0},
        {id: 35, design: "N", borders: ['city', 'city', 'field', 'field'], pennant: false, rotation: 0},
        {id: 36, design: "N", borders: ['city', 'city', 'field', 'field'], pennant: false, rotation: 0},
        {id: 37, design: "N", borders: ['city', 'city', 'field', 'field'], pennant: false, rotation: 0},
        {id: 38, design: "O", borders: ['city', 'road', 'road', 'city'], pennant: true, rotation: 0},
        {id: 39, design: "O", borders: ['city', 'road', 'road', 'city'], pennant: true, rotation: 0},
        {id: 40, design: "P", borders: ['city', 'road', 'road', 'city'], pennant: false, rotation: 0},
        {id: 41, design: "P", borders: ['city', 'road', 'road', 'city'], pennant: false, rotation: 0},
        {id: 42, design: "P", borders: ['city', 'road', 'road', 'city'], pennant: false, rotation: 0},
        {id: 43, design: "Q", borders: ['city', 'city', 'field', 'city'], pennant: true, rotation: 0},
        {id: 44, design: "R", borders: ['city', 'city', 'field', 'city'], pennant: false, rotation: 0},
        {id: 45, design: "R", borders: ['city', 'city', 'field', 'city'], pennant: false, rotation: 0},
        {id: 46, design: "R", borders: ['city', 'city', 'field', 'city'], pennant: false, rotation: 0},
        {id: 47, design: "S", borders: ['city', 'city', 'road', 'city'], pennant: true, rotation: 0},
        {id: 48, design: "S", borders: ['city', 'city', 'road', 'city'], pennant: true, rotation: 0},
        {id: 49, design: "T", borders: ['city', 'city', 'road', 'city'], pennant: false, rotation: 0},
        {id: 50, design: "U", borders: ['road', 'field', 'road', 'field'], pennant: false, rotation: 0},
        {id: 51, design: "U", borders: ['road', 'field', 'road', 'field'], pennant: false, rotation: 0},
        {id: 52, design: "U", borders: ['road', 'field', 'road', 'field'], pennant: false, rotation: 0},
        {id: 53, design: "U", borders: ['road', 'field', 'road', 'field'], pennant: false, rotation: 0},
        {id: 54, design: "U", borders: ['road', 'field', 'road', 'field'], pennant: false, rotation: 0},
        {id: 55, design: "U", borders: ['road', 'field', 'road', 'field'], pennant: false, rotation: 0},
        {id: 56, design: "U", borders: ['road', 'field', 'road', 'field'], pennant: false, rotation: 0},
        {id: 57, design: "U", borders: ['road', 'field', 'road', 'field'], pennant: false, rotation: 0},
        {id: 58, design: "V", borders: ['field', 'field', 'road', 'road'], pennant: false, rotation: 0},
        {id: 59, design: "V", borders: ['field', 'field', 'road', 'road'], pennant: false, rotation: 0},
        {id: 60, design: "V", borders: ['field', 'field', 'road', 'road'], pennant: false, rotation: 0},
        {id: 61, design: "V", borders: ['field', 'field', 'road', 'road'], pennant: false, rotation: 0},
        {id: 62, design: "V", borders: ['field', 'field', 'road', 'road'], pennant: false, rotation: 0},
        {id: 63, design: "V", borders: ['field', 'field', 'road', 'road'], pennant: false, rotation: 0},
        {id: 64, design: "V", borders: ['field', 'field', 'road', 'road'], pennant: false, rotation: 0},
        {id: 65, design: "V", borders: ['field', 'field', 'road', 'road'], pennant: false, rotation: 0},
        {id: 66, design: "V", borders: ['field', 'field', 'road', 'road'], pennant: false, rotation: 0},
        {id: 67, design: "W", borders: ['field', 'road', 'road', 'road'], pennant: false, rotation: 0},
        {id: 68, design: "W", borders: ['field', 'road', 'road', 'road'], pennant: false, rotation: 0},
        {id: 69, design: "W", borders: ['field', 'road', 'road', 'road'], pennant: false, rotation: 0},
        {id: 70, design: "W", borders: ['field', 'road', 'road', 'road'], pennant: false, rotation: 0},
        {id: 71, design: "X", borders: ['road', 'road', 'road', 'road'], pennant: false, rotation: 0}
    ] as ITile[]).map((tile) => (
        new Tile(tile)
    ));

    public getShuffledDeck() {
        return shuffle(this.deck);
    }
}

export class Tile implements ITile {
    public id: number;
    public design: string;             // Use for image
    public borders: ('field' | 'road' | 'wall' | 'water' | 'city')[]; // 0 - top, 1 - right, 2 - bottom, 3 - left
    public rotation: number;           //
    public units: (Unit | null)[];     // 0 - top, 1 - right, 2 - bottom, 3 - left
    public pennant: boolean;
    public coords: { x: number, y: number };

    constructor(tile: Tile | Omit<ITile, 'units' | 'rotation'> ) {
        this.id = tile.id;
        this.pennant = tile.pennant;
        this.design = tile.design;
        this.borders = tile.borders;
        this.coords = tile.coords ?? {x: -999, y: -999};

        // Default common values that doesn't depend on tile
        if (tile instanceof Tile) {
            this.rotation = tile.rotation ?? 0;
            this.units = tile.units ?? [null, null, null, null];
        } else {
            this.rotation = 0;
            this.units = [null, null, null, null];
        }

    }

    // Rotate the tile by rotateValue.
    // 0 - top, 1 - right, 2 - bottom, 3 - left
    public rotate(rotateValue: number) {
        if (rotateValue < 0) rotateValue = 4 + rotateValue;

        this.rotation = Math.abs((this.rotation + rotateValue)) % 4;

        return this;
    }

    // Return a React component of image with rotated tile
    public Image(tileSize = 198) {
        return (
            <img
                className="rounded-sm shadow-md"
                src={`/tiles/${this.design}.png`}
                draggable="false"
                alt=""
                style={{
                    width: tileSize + 'px',
                    height: tileSize + 'px',
                    transform: `rotate(${90 * this.rotation}deg)`
                }}
            />
        );
    }

    public setUnit(unit: (Unit | null), position: 0 | 1 | 2 | 3) {
        this.units[position] = unit;

        return this;
    }

    public setCoords(x: number, y: number) {
        this.coords = {x, y};

        return this;
    }
}

export default TilesDeck;