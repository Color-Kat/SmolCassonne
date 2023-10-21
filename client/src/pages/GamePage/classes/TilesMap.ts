import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";

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

    private isDebug = false;
    private debug(...args: any[]) {
        if(this.isDebug)
            console.log(...args);
    }

    /**
     * return starting map with one default tile.
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

    public calculateScore() {
        // Algorithm
        // o through all objects that are connected to all 4 sides of the just placed tile.
        // Count all types of objects that are connected to the tile.
        // Then create a list of units that are on these objects
        // And in the end calculate score for every team
        console.log(this.tiles)

        // Get just placed tile, it's the start of the algorithm
        let lastTile = this.tiles.at(-1) as Tile;

        // Data about objects (road, city, field) that are connected to just placed tile
        // This data includes count of tiles of this object
        // and units that are placed on this type of object
        let objectsData = {
            road: {
                count: 0,
                units: []
            },
            field: {
                count: 0,
                units: []
            },
            city: {
                count: 0,
                units: []
            }
        }

        // List of checked tiles
        let checkedIds: number[] = [lastTile.id];

        // const checkTile = (tile: Tile, side: number) => {
        //     this.debug('-------- check tile for score --------');
        //     let count = 0;
        //
        //     // A unit stays on this tile side, increase count
        //     if(tile.units[side]) count += 1;
        //
        //     // The map side is opposite to the tile side ][
        //     let mapSide: any = 0;
        //     if(side === 0) mapSide = 2;
        //     if(side === 1) mapSide = 3;
        //     if(side === 2) mapSide = 0;
        //     if(side === 3) mapSide = 1;
        //
        //     // Iterate all map tiles and search for the neighbors that are connected by the same border
        //     for (const mapTile of this.tiles) {
        //
        //
        //         // TODO Проверка начинается с другой стороны тайла, если mapSide = этой стороне, и эта сторона подходит по объекту.
        //
        //
        //         let className = 'border-red-600 scale-90';
        //
        //         // Skip already checked tiles
        //         if(checkedIds.includes(mapTile.id)) {
        //             this.debug('Already checked', mapTile.borders);
        //             continue; // Skip checked tiles
        //         }
        //
        //         // Skip current tile
        //         if(tile.id == mapTile.id) {
        //             this.debug('tile.id == mapTile.id');
        //             continue; // Skip the same tile
        //         }
        //
        //         // Skip tiles that are not connected to our border
        //         if(mapTile.borders[mapSide] != borderName) {
        //             if(this.isDebug) mapTile.className = 'opacity-50';
        //             this.debug('mapTile.borders[mapSide] != borderName');
        //             continue; // Skip tiles that are not connected to our
        //         }
        //
        //         // Skip tiles that are not corresponding to the current tile side
        //         // If we check the left side of the current tile,
        //         // then we need to check only one neighbor that is on the left side
        //         if(
        //             (side == 0 && (mapTile.coords.x != tile.coords.x || mapTile.coords.y - tile.coords.y != -tileSize)) ||
        //             (side == 2 && (mapTile.coords.x != tile.coords.x || mapTile.coords.y - tile.coords.y != tileSize) ) ||
        //             (side == 1 && (mapTile.coords.x - tile.coords.x != tileSize ||mapTile.coords.y != tile.coords.y)) ||
        //             (side == 3 && (mapTile.coords.x - tile.coords.x != -tileSize || mapTile.coords.y != tile.coords.y))
        //         ) {
        //             if(this.isDebug) mapTile.className = 'opacity-50';
        //             this.debug('It a right neighbor');
        //             continue; // It a right neighbor
        //         }
        //
        //         this.debug(mapTile.borders);
        //
        //         // --- This tile is a right neighbor --- //
        //
        //         // We have checked this tile
        //         checkedIds.push(mapTile.id);
        //
        //         // Check if there is a unit on this side
        //         if(mapTile.units[mapSide]) count++;
        //
        //         // Check for units on other sides of the neighbor that matches the border (check all cities, fields, etc)
        //
        //         // Business logic for a field that cannot go through the tile center
        //         if(
        //             borderName == 'field' &&
        //             mapTile.borders[(mapSide + 1) % 4] != 'field' &&
        //             mapTile.borders[(mapSide + 3) % 4] != 'field'
        //         ) continue;
        //
        //         className += ` border-${this.getSideName(mapSide)}-8`;
        //
        //         mapSide = (mapSide + 1) % 4
        //         if(borderName == mapTile.borders[mapSide]) {
        //             className += ` border-${this.getSideName(mapSide)}-4`;
        //             this.debug('go to ', mapSide);
        //             count += countUnits(mapTile, mapSide); // Calculate units on this side
        //         }
        //
        //         mapSide = (mapSide + 2) % 4;
        //         if(borderName == mapTile.borders[mapSide]){
        //             className += ` border-${this.getSideName(mapSide)}-4`;
        //             this.debug('go to ', mapSide);
        //             count += countUnits(mapTile, mapSide);
        //
        //         }
        //
        //         mapSide = (mapSide + 3) % 4;
        //         if(borderName == mapTile.borders[mapSide]){
        //             className += ` border-${this.getSideName(mapSide)}-4`;
        //             this.debug('go to ', mapSide);
        //             count += countUnits(mapTile, mapSide);
        //         }
        //
        //         // For debug visualize algorithm
        //         if(this.isDebug) mapTile.className = className;
        //     }
        //
        //     return count;
        // }
        //
        // let side = 0;
        // let data = checkTile(lastTile, side);
        // let borderName = lastTile.borders[0] as keyof typeof objectsData;
        // objectsData[borderName].count += data.count;
        // objectsData[borderName].units.push(...data.units);

        for(let side = 0; side<4; side++){
            console.log(side);
        }

        this.debug('Result: ' + objectsData);
        // return count === 0;
    }
}