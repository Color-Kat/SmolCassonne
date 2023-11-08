import {shuffle} from '@/utils/arrays';
import {Unit} from "@pages/GamePage/classes/Units.ts";
import React from "react";

export type BorderType = 'city' | 'road' | 'field';

export interface ITile {
    id: number;
    design: string;
    pennant: boolean;
    borders: BorderType[];
    // objects: {city: number, road: number}[];
    rotation: number;

    roadEnd: boolean;

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
        {id: 1, design: "A", borders: ['field', 'field', 'road', 'field'], rotation: 0, roadEnd: true},
        {id: 2, design: "A", borders: ['field', 'field', 'road', 'field'], rotation: 0, roadEnd: true},
        {id: 3, design: "B", borders: ['field', 'field', 'field', 'field'], rotation: 0},
        {id: 4, design: "B", borders: ['field', 'field', 'field', 'field'], rotation: 0},
        {id: 5, design: "B", borders: ['field', 'field', 'field', 'field'], rotation: 0},
        {id: 6, design: "B", borders: ['field', 'field', 'field', 'field'], rotation: 0},
        {id: 7, design: "C", borders: ['city', 'city', 'city', 'city'], pennant: true, rotation: 0},
        {id: 8, design: "D", borders: ['city', 'road', 'field', 'road'], rotation: 0},
        {id: 9, design: "D", borders: ['city', 'road', 'field', 'road'], rotation: 0},
        {id: 10, design: "D", borders: ['city', 'road', 'field', 'road'], rotation: 0},
        {id: 11, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        {id: 12, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        {id: 13, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        {id: 14, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        {id: 15, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        {id: 16, design: "F", borders: ['field', 'city', 'field', 'city'], pennant: true, rotation: 0},
        {id: 17, design: "F", borders: ['field', 'city', 'field', 'city'], pennant: true, rotation: 0},
        {id: 18, design: "G", borders: ['field', 'city', 'field', 'city'], rotation: 0},
        {id: 19, design: "H", borders: ['field', 'city', 'field', 'city',], rotation: 0},
        {id: 20, design: "H", borders: ['field', 'city', 'field', 'city'], rotation: 0},
        {id: 21, design: "H", borders: ['field', 'city', 'field', 'city'], rotation: 0},
        {id: 22, design: "I", borders: ['city', 'field', 'field', 'city'], rotation: 0},
        {id: 23, design: "I", borders: ['city', 'field', 'field', 'city'], rotation: 0},
        {id: 24, design: "J", borders: ['city', 'road', 'road', 'field'], rotation: 0},
        {id: 25, design: "J", borders: ['city', 'road', 'road', 'field'], rotation: 0},
        {id: 26, design: "J", borders: ['city', 'road', 'road', 'field'], rotation: 0},
        {id: 27, design: "K", borders: ['city', 'field', 'road', 'road'], rotation: 0},
        {id: 28, design: "K", borders: ['city', 'field', 'road', 'road'], rotation: 0},
        {id: 29, design: "K", borders: ['city', 'field', 'road', 'road'], rotation: 0},
        {id: 30, design: "L", borders: ['city', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        {id: 31, design: "L", borders: ['city', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        {id: 32, design: "L", borders: ['city', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        {id: 33, design: "M", borders: ['city', 'field', 'field', 'city'], pennant: true, rotation: 0},
        {id: 34, design: "M", borders: ['city', 'field', 'field', 'city'], pennant: true, rotation: 0},
        {id: 35, design: "N", borders: ['city', 'city', 'field', 'field'], rotation: 0},
        {id: 36, design: "N", borders: ['city', 'city', 'field', 'field'], rotation: 0},
        {id: 37, design: "N", borders: ['city', 'city', 'field', 'field'], rotation: 0},
        {id: 38, design: "O", borders: ['city', 'road', 'road', 'city'], pennant: true, rotation: 0},
        {id: 39, design: "O", borders: ['city', 'road', 'road', 'city'], pennant: true, rotation: 0},
        {id: 40, design: "P", borders: ['city', 'road', 'road', 'city'], rotation: 0},
        {id: 41, design: "P", borders: ['city', 'road', 'road', 'city'], rotation: 0},
        {id: 42, design: "P", borders: ['city', 'road', 'road', 'city'], rotation: 0},
        {id: 43, design: "Q", borders: ['city', 'city', 'field', 'city'], pennant: true, rotation: 0},
        {id: 44, design: "R", borders: ['city', 'city', 'field', 'city'], rotation: 0},
        {id: 45, design: "R", borders: ['city', 'city', 'field', 'city'], rotation: 0},
        {id: 46, design: "R", borders: ['city', 'city', 'field', 'city'], rotation: 0},
        {id: 47, design: "S", borders: ['city', 'city', 'road', 'city'], pennant: true, rotation: 0, roadEnd: true},
        {id: 48, design: "S", borders: ['city', 'city', 'road', 'city'], pennant: true, rotation: 0, roadEnd: true},
        {id: 49, design: "T", borders: ['city', 'city', 'road', 'city'], rotation: 0, roadEnd: true},
        {id: 50, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        {id: 51, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        {id: 52, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        {id: 53, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        {id: 54, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        {id: 55, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        {id: 56, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        {id: 57, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        {id: 58, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        {id: 59, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        {id: 60, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        {id: 61, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        {id: 62, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        {id: 63, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        {id: 64, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        {id: 65, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        {id: 66, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        {id: 67, design: "W", borders: ['field', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        {id: 68, design: "W", borders: ['field', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        {id: 69, design: "W", borders: ['field', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        {id: 70, design: "W", borders: ['field', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        {id: 71, design: "X", borders: ['road', 'road', 'road', 'road'], rotation: 0, roadEnd: true}
    ] as ITile[]).map((tile) => (
        new Tile(tile)
    ));

    public getShuffledDeck() {
        return shuffle(this.deck).slice(0, 12);
    }

    /**
     * Restore a list of Tiles instances from a simple array of tile objects.
     * @param deckTiles
     */
    static hydrate(deckTiles: ITile[]): Tile[] {
        const hydratedDeck = deckTiles.map(tile => (new Tile(tile)));
        return hydratedDeck;
    }
}

export class Tile implements ITile {
    public id: number;
    public design: string;                                          // Use for image
    public borders: BorderType[];                                   // 0 - top, 1 - right, 2 - bottom, 3 - left
    public rotation: number = 0;                                    //
    public units: (Unit | null)[] = [null, null, null, null];       // 0 - top, 1 - right, 2 - bottom, 3 - left
    public pennant: boolean;
    public roadEnd: boolean;
    public coords: { x: number, y: number };

    public name: string = 'Успенский собор';
    public description: string = 'Собо́р Успе́ния Пресвято́й Богоро́дицы — православный храм в Смоленске, кафедральный собор Смоленской митрополии Русской православной церкви. Находится в центральной части города на Соборной горе';
    public realPhoto: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/%D0%92%D0%B8%D0%B4_%D0%B2%D0%B5%D1%87%D0%B5%D1%80%D0%BE%D0%BC.jpg/1280px-%D0%92%D0%B8%D0%B4_%D0%B2%D0%B5%D1%87%D0%B5%D1%80%D0%BE%D0%BC.jpg';

    public className: string = ''; // Manually used for debug

    private sidesCount = 4;

    constructor(tile: Tile | (Partial<ITile> & Omit<ITile, 'units' | 'rotation' | 'roadEnd'>)) {
        this.id = tile.id;
        this.design = tile.design;
        this.borders = tile.borders;
        this.pennant = tile.pennant ?? false;
        this.roadEnd = tile.roadEnd ?? false;
        this.coords = tile.coords ?? {x: -999, y: -999};

        // Default common values that doesn't depend on tile
        if (tile instanceof Tile) {
            this.rotation = tile.rotation ?? 0;
            this.units = tile.units ?? [null, null, null, null];
        } else {
            if(tile.rotation) this.rotate(tile.rotation, false);
            this.units = tile.units?.map(unit => unit ? new Unit(unit) : null) ?? [null, null, null, null];
            // this.rotation = 0;
            // this.units = [null, null, null, null];
        }
    }

    /**
     * Move tile entities that are connected to borders.
     * When we rotate tile, we need to shift borders and units.
     * @param steps
     * @private
     */
    private shiftAll(steps: number) {
        const shiftAmount = steps % this.sidesCount;

        if (shiftAmount === 0) return;

        if (shiftAmount > 0) {
            // Shift right
            let removedElements = [];

            // Shift borders
            removedElements = this.borders.splice(-shiftAmount);
            this.borders.unshift(...removedElements);

            // Shift units
            removedElements = this.units.splice(-shiftAmount);
            this.units.unshift(...removedElements);
        } else {
            // Shift left
            let removedElements = [];

            // Shift borders
            removedElements = this.borders.splice(0, -shiftAmount);
            this.borders.push(...removedElements);

            // Shift units
            removedElements = this.units.splice(0, -shiftAmount);
            this.units.push(...removedElements);
        }
    }

    /**
     * Rotate the tile by rotateValue.
     * 0 - top, 1 - right, 2 - bottom, 3 - left
     * @param rotateValue
     * @param shift
     */
    public rotate(rotateValue: number, shift: boolean = true) {
        if (rotateValue < 0) rotateValue = 4 + rotateValue;
        this.rotation = Math.abs((this.rotation + rotateValue)) % 4;

        if(shift) this.shiftAll(rotateValue);

        return this;
    }

    /**
     * Return a React component of image with rotated tile
     *
     * @param tileSize
     * @constructor
     */
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

    /**
     * Check if the tile can be placed on the map according to the rules.
     *
     * @param tileSize
     * @param map
     * @param setTooltip
     */
    public checkIfFit(
        tileSize: number,
        map: Tile[],
        setTooltip: React.Dispatch<React.SetStateAction<string>>,
    ) {
        if (!this.coords) return false;

        let neighborsCount = 0;

        for (const mapTile of map) {
            // Skip tiles that is not a neighbor for the tile
            if (
                !mapTile.coords ||
                !((
                        Math.abs(this.coords.x - mapTile.coords.x) <= tileSize &&
                        Math.abs(this.coords.y - mapTile.coords.y) == 0
                    ) ||
                    (
                        Math.abs(this.coords.y - mapTile.coords.y) <= tileSize &&
                        Math.abs(this.coords.x - mapTile.coords.x) == 0
                    ))
            ) continue;

            // This place is already occupied
            if (this.coords.y == mapTile.coords.y && this.coords.x == mapTile.coords.x) {
                setTooltip('Это место уже занято');
                return false;
            }

            // Increase count of neighbors
            neighborsCount++;

            // Get indexes of the tile and mapTile sides that is contacted
            let tileContactSide = 0; // 0 - top, 1 - right, 2 - bottom, 3 - left
            let mapTileContactSide = 0; // 0 - top, 1 - right, 2 - bottom, 3 - left

            if (this.coords.y < mapTile.coords.y) {
                tileContactSide = 2;
                mapTileContactSide = 0;
            }
            if (this.coords.y > mapTile.coords.y) {
                tileContactSide = 0;
                mapTileContactSide = 2;
            }
            if (this.coords.x > mapTile.coords.x) {
                tileContactSide = 3;
                mapTileContactSide = 1;
            }
            if (this.coords.x < mapTile.coords.x) {
                tileContactSide = 1;
                mapTileContactSide = 3;
            }

            // Get a name of the contracted sides
            const tileBorder = this.borders[tileContactSide];
            const mapTileBorder = mapTile.borders[mapTileContactSide];

            // We can't place the tile when at least one neighbor is not equal by the side
            if (tileBorder !== mapTileBorder) {
                setTooltip('Границы тайлов не совместимы. Найдите другое место для тайла');

                return false;
            }
        }

        // We can place tile only by other tiles
        if (neighborsCount > 0) return true;
        else {
            setTooltip('Вы можете ставить тайлы только рядом с другими тайлами');

            // We can't place the tile
            return false;
        }
    };

    /**
     * Return index of side at position (0, 1, 2, 3) with rotation.
     *
     * @param position
     */
    // public getSideIndexWithRotation(position: number) {
    //     return ( 4 + position) % 4;
    // }
}

export default TilesDeck;