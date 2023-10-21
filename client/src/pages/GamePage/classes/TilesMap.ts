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
}