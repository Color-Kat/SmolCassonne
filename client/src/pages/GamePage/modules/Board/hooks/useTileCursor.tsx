import React, {MouseEventHandler, ReactNode, useMemo, useState} from "react";
import {ITile} from "@pages/GamePage/classes/TilesDeck.ts";
import {IMapTile} from "@pages/GamePage/modules/Board/types.ts";
import {twJoin} from "tailwind-merge";


interface ITileCursorParams {
    tileSize: number;
    mapScale: number;
    mapNavigationRef: React.RefObject<HTMLUListElement>;
    map: IMapTile[];
    setMap: React.Dispatch<React.SetStateAction<IMapTile[]>>;

    currentTile: ITile | undefined;

    placeTileCallback: () => void;
    setTooltip: React.Dispatch<React.SetStateAction<string>>;
}

export const useTileCursor = ({
                                  tileSize,
                                  mapScale,
                                  mapNavigationRef,
                                  map,
                                  setMap,

                                  currentTile,

                                  placeTileCallback,
                                  setTooltip

                              }: ITileCursorParams) => {
    const [wrongAnimation, setWrongAnimation] = useState(false);

    const [tilePosition, setTilePosition] = useState({x: 0, y: 0});
    const [showTile, setShowTile] = useState(false);
    const [placedTile, setPlacedTile] = useState<ITile | null>(null);

    const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
        const {clientX, clientY} = event;
        setTilePosition({x: clientX, y: clientY});
    };

    const handleMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
        setShowTile(true);
    };

    const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
        setShowTile(false);
    };
    /* ----- Tile cursor ----- */


    /**
     * Place the current tile on the map by click
     * @param e
     * @returns
     */
    const placeTile: MouseEventHandler<HTMLDivElement> = (e) => {
        if (!currentTile) return;

        // Coords relative to the document
        let {clientX: x, clientY: y} = e;

        // Get map rect
        const rect = mapNavigationRef.current!.getBoundingClientRect();

        // Get coords relative to the edges of the map
        x += mapNavigationRef.current!.scrollLeft - rect.left;
        y += mapNavigationRef.current!.scrollTop - rect.top;

        x /= mapScale;
        y /= mapScale;

        // Get the exact coords of the tile on the map
        const tile = {
            ...currentTile,
            coords: {
                x: x - x % tileSize,
                y: y - y % tileSize
            }
        };

        /* --- Check if tile can be placed on the map --- */
        if (!checkIfFit(tile)) {
            return;
        }

        /* --- ====================================== --- */

        // Add tile to the map
        setMap(map => ([
            ...map,
            tile
        ]));

        setPlacedTile(currentTile);

        placeTileCallback();
    };

    /**
     * Check if the tile can be placed on the map according to the rules
     * @param tile
     */
    const checkIfFit = (tile: IMapTile) => {
        let neighborsCount = 0;

        for (const mapTile of map) {
            // Skip tiles that is not a neighbor for the tile
            if (!(
                (
                    Math.abs(tile.coords.x - mapTile.coords.x) <= tileSize &&
                    Math.abs(tile.coords.y - mapTile.coords.y) == 0
                ) ||
                (
                    Math.abs(tile.coords.y - mapTile.coords.y) <= tileSize &&
                    Math.abs(tile.coords.x - mapTile.coords.x) == 0
                )
            )) continue;

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

            // Take into account the rotation
            const tileBorderIndex = (4 + tileContactSide - tile.rotation) % 4;
            const mapTileBorderIndex = (4 + mapTileContactSide - mapTile.rotation) % 4;

            // Get name of the contracted sides
            const tileBorder = tile.borders[tileBorderIndex];
            const mapTileBorder = mapTile.borders[mapTileBorderIndex];

            // We can't place the tile when at least one neighbor is not equal by the side
            if (tileBorder !== mapTileBorder) {
                setTooltip('Границы тайлов не совместимы. Найдите другое место для тайла');

                // Display tile animation
                setWrongAnimation(true);
                setTimeout(() => setWrongAnimation(false), 1000);

                return false;
            }
        }

        // We can place tile only by other tiles
        if (neighborsCount > 0) return true;
        else {
            setTooltip('Вы можете ставить тайлы только рядом с другими тайлами');

            // Display tile animation
            setWrongAnimation(true);
            setTimeout(() => setWrongAnimation(false), 1000);

            // We can't place the tile
            return false;
        }
    };

    const PlacedTile = () => {
        if(!placedTile) return null;

        return (
            <img
                className="rounded-sm shadow-md"
                src={`/tiles/${placedTile.design}.png`}
                draggable="false"
                alt=""
                style={{
                    width: tileSize + 'px',
                    height: tileSize + 'px',
                    transform: `rotate(${90 * placedTile.rotation}deg)`
                }}
            />
        );
    }

    return {
        showTile,
        setShowTile,
        tilePosition,
        handleMouseMove,
        handleMouseEnter,
        handleMouseLeave,
        placeTile,
        PlacedTile
    };
};