import {ITile, Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import React from "react";
import {MapContext} from "@pages/GamePage/gameContext.ts";

/**
 * TilesMap class provides methods for working with tiles on the map.
 *
 * It's just methods for map, not a map data structure.
 */
export class TilesMap {
    public tiles: Tile[];

    constructor(tiles?: Tile[]) {
        this.tiles = tiles ?? [];
    }

    /**
     * Restore a list of Tiles instances from a simple array of tile objects.
     * @param tiles
     */
    static hydrate(tiles: ITile[]): Tile[] {
        const hydratedTiles = tiles.map(tile => (new Tile(tile)));
        return hydratedTiles;
        // return new TilesMap(hydratedTiles);
    }

    private isDebug = false;

    private debug(...args: any[]) {
        if (this.isDebug) {
            console.log(...args);
        }
    }

    private getSideName(side: 0 | 1 | 2 | 3) {
        return {0: 't', 1: 'r', 2: 'b', 3: 'l'}[side];
    }

    /**
     * return the starting map with one default tile.
     *
     * @param mapCenter
     * @param tileSize
     */
    public getStartingMap(mapCenter: number, tileSize: number) {
        return [new Tile({
            id: 0,
            design: "D",
            borders: ['city', 'road', 'field', 'road'],
            pennant: false,
            coords: {x: mapCenter - mapCenter % tileSize, y: mapCenter - mapCenter % tileSize}
        })];
    }

    /**
     * Check if the tile can be placed on the map according to the rules.
     *
     * @param tile
     * @param tileSize
     * @param setTooltip
     */
    public checkIfFit(
        tile: Tile,
        tileSize: number,
        setTooltip: React.Dispatch<React.SetStateAction<string>>,
    ) {
        if (!tile.coords) return false;

        let neighborsCount = 0;

        for (const mapTile of this.tiles) {
            // Skip tiles that is not a neighbor for the tile
            if (
                !mapTile.coords ||
                !((
                        Math.abs(tile.coords.x - mapTile.coords.x) <= tileSize &&
                        Math.abs(tile.coords.y - mapTile.coords.y) == 0
                    ) ||
                    (
                        Math.abs(tile.coords.y - mapTile.coords.y) <= tileSize &&
                        Math.abs(tile.coords.x - mapTile.coords.x) == 0
                    ))
            ) continue;

            // tile place is already occupied
            if (tile.coords.y == mapTile.coords.y && tile.coords.x == mapTile.coords.x) {
                setTooltip('Это место уже занято');
                return false;
            }

            // Increase count of neighbors
            neighborsCount++;

            // Get indexes of the tile and mapTile sides that is contacted
            let tileContactSide = 0; // 0 - top, 1 - right, 2 - bottom, 3 - left
            let mapTileContactSide = 0; // 0 - top, 1 - right, 2 - bottom, 3 - left

            if (tile.coords.y < mapTile.coords.y) {
                tileContactSide = 2;
                mapTileContactSide = 0;
            }
            if (tile.coords.y > mapTile.coords.y) {
                tileContactSide = 0;
                mapTileContactSide = 2;
            }
            if (tile.coords.x > mapTile.coords.x) {
                tileContactSide = 3;
                mapTileContactSide = 1;
            }
            if (tile.coords.x < mapTile.coords.x) {
                tileContactSide = 1;
                mapTileContactSide = 3;
            }

            // Get a name of the contracted sides
            const tileBorder = tile.borders[tileContactSide];
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

    private pointsWeight = {
        city: 2,
        field1: 1,
        field2: 1,
        road1: 1,
        road2: 1,
        road3: 1,
        road4: 1,
    };

    public calculateScore(
        tileSize: number
    ) {
        if(this.isDebug) console.clear();

        // Algorithm
        // Go through all objects that are connected to all four sides of the just placed tile.
        // Count all types of objects that are connected to the tile.
        // Then create a list of units that are on these objects
        // And in the end, calculate score for every team
        this.debug(this.tiles);

        // Get just placed tile, it's the start of the algorithm
        let lastTile = this.tiles.at(-1) as Tile;

        // Data about objects (road, city, field) that are connected to just placed tile
        // This data includes count of tiles of this object
        // and units that are placed on this type of object
        // If it's false, It means that this object is no finished yet
        let objectsData: { [key: string]: ({ count: number, units: Unit[] } | false) } = {
            city: {count: 0, units: []},
            field1: {count: 0, units: []},
            field2: {count: 0, units: []}, // There are tiles with two fields
            road1: {count: 0, units: []},   // There are tiles with four roads
            road2: {count: 0, units: []},
            road3: {count: 0, units: []},
            road4: {count: 0, units: []},
        };

        // List of checked tiles
        let checkedIds: number[] = [lastTile.id];

        const checkTile = (tile: Tile, side: number) => {
            this.debug('-------- Check tile for score --------');

            let result: { count: number, units: Unit[] } = {
                count: 0, // This tile already contains one tile of this object type
                units: []
            };

            // A unit stays on this tile side, add it to the list
            if (tile.units[side]) result.units.push(tile.units[side] as Unit);

            // Get the name of the border that the algorithm is currently checking
            const borderName = tile.borders[side];

            // The map side is opposite to the tile side ][
            let mapSide: any = 0;
            if (side === 0) mapSide = 2;
            if (side === 1) mapSide = 3;
            if (side === 2) mapSide = 0;
            if (side === 3) mapSide = 1;

            let hasAlreadyCheckedRoadNeighbor = false;

            // Iterate all map tiles and search for the neighbors that are connected by the same border
            for (const mapTile of this.tiles) {

                let className = 'border-red-600 scale-90';

                // Skip current tile
                if (tile.id == mapTile.id) {
                    this.debug('tile.id == mapTile.id');
                    continue; // Skip the same tile
                }

                // Skip tiles that are not connected to our border
                if (mapTile.borders[mapSide] != borderName) {
                    if (this.isDebug) mapTile.className = 'opacity-50';
                    this.debug('mapTile.borders[mapSide] != borderName');
                    continue; // Skip map tiles that are not connected to the current tile
                }

                // Skip tiles that are not corresponding to the current tile side
                // If we check the left side of the current tile,
                // then we need to check only one neighbor that is on the left side
                if (
                    (side == 0 && (mapTile.coords.x != tile.coords.x || mapTile.coords.y - tile.coords.y != -tileSize)) ||
                    (side == 2 && (mapTile.coords.x != tile.coords.x || mapTile.coords.y - tile.coords.y != tileSize)) ||
                    (side == 1 && (mapTile.coords.x - tile.coords.x != tileSize || mapTile.coords.y != tile.coords.y)) ||
                    (side == 3 && (mapTile.coords.x - tile.coords.x != -tileSize || mapTile.coords.y != tile.coords.y))
                ) {
                    if (this.isDebug) mapTile.className = 'opacity-50';
                    this.debug('It is not a neighbor');
                    continue; // It is not a neighbor
                }

                // Skip already checked tiles
                if (checkedIds.includes(mapTile.id)) {
                    this.debug('Already checked', mapTile.borders);

                    hasAlreadyCheckedRoadNeighbor = true;

                    continue; // Skip checked tiles
                }

                this.debug(mapTile.borders);

                // --- This tile is a right neighbor --- //

                // We have checked this tile
                checkedIds.push(mapTile.id);

                // Check if there is a unit on this side
                if (mapTile.units[mapSide])
                    result.units.push(mapTile.units[mapSide] as Unit);

                // Increase the count of the tile of this type of object
                result.count++;

                // -------------------------------------
                // Check for units on other sides of the neighbor that matches the border (check all cities, fields, etc)

                // If it's a road end, stop checking because this road can't be connected to other roads.
                if (
                    borderName === 'road' &&
                    mapTile.roadEnd
                ) continue;

                // Business logic for a field that cannot go through the tile center
                if (
                    borderName == 'field' &&
                    mapTile.borders[(mapSide + 1) % 4] != 'field' &&
                    mapTile.borders[(mapSide + 3) % 4] != 'field'
                ) continue;

                className += ` border-${this.getSideName(mapSide)}-8`;

                // Check tiles that match the border on all sides
                for (let mapSideOffset = 1; mapSideOffset < 4; mapSideOffset++) {
                    mapSide = (mapSide + mapSideOffset) % 4;

                    if (borderName == mapTile.borders[mapSide]) {
                        className += ` border-${this.getSideName(mapSide)}-4`;
                        this.debug('go to ', mapSide);

                        if (result.count === 0) result.count = 1; // At least this tile is a correct object tile
                        let data = checkTile(mapTile, mapSide); // Check another tile
                        if (data === false) {
                            if(this.isDebug) mapTile.className = className + " border-yellow-500";
                            return false;
                        }

                        result.count += data.count; // Increase count of this object tiles
                        result.units.push(...data.units); // Push units
                    }
                }

                // For debug visualize algorithm
                if (this.isDebug)
                    mapTile.className = className;
            }

            this.debug('hasAlreadyCheckedNeighbor: ', hasAlreadyCheckedRoadNeighbor);
            if (result.count === 0 && !hasAlreadyCheckedRoadNeighbor) return false;

            return result;
        };

        // Start checking for all four sides
        let currentFieldNumber = 1;
        let currentRoadNumber = 1; // For checking four roads
        for (let side = 0; side < 4; side++) {
            let borderName = lastTile.borders[side] as keyof typeof objectsData;

            // Check for second field
            if (borderName == 'field') borderName = 'field' + currentFieldNumber++;
            if (
                borderName == 'field' &&
                lastTile.borders[(side + 1) % 4] != 'field' &&
                lastTile.borders[(side + 3) % 4] != 'field'
            ) currentFieldNumber = 2; // Next check the second field

            // Set road number fo checking four roads when it is an end of the road
            if(borderName == 'road' && lastTile.roadEnd)
                borderName = 'road' + currentRoadNumber++;

            // This object is not finished at all
            if (!objectsData[borderName]) continue;

            // let data = checkTile(lastTile, side);
            let data = checkTile(lastTile, side);

            if (data == false) {
                objectsData[borderName] = false;
            } else { // @ts-ignore
                if (objectsData[borderName].count === 0) objectsData[borderName].count = 1; // @ts-ignore
                objectsData[borderName].count += data.count; // @ts-ignore
                objectsData[borderName].units.push(...data.units);
            }

            // If it's a road end, stop checking because this road can't be connected to other roads.
            // if (borderName == 'road' && lastTile.roadEnd) break;
        }

        // TODO - дороги-циклы (даже с перекрёстком)

        this.debug('Result: ', objectsData);

        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        // ========== Calculate score ==========

        const score: { [key: string]: number } = {};
        const freeUnitIds = [];
        for (const [objectName, objectData] of Object.entries(objectsData)) {
            if (objectData === false) continue;

            // How many points is this object worth?
            const pointsWeight = this.pointsWeight[objectName as keyof typeof this.pointsWeight];

            // Calculate points without a unit multiplier by object length
            const rawPoints = pointsWeight * objectData.count;

            for (const unit of objectData.units) {
                if(!unit.team) continue;
                score[unit.team] = rawPoints * unit.scoreMultiplier[objectName];
                freeUnitIds.push(unit.id);
            }
        }

        return {score, freeUnitIds};
    }
}