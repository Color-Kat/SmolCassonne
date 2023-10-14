import React, {MouseEvent, useRef, useState, useEffect} from "react";
import {twJoin} from "tailwind-merge";

import {ITile} from "../../classes/TilesDeck";

import tableImage from "./assets/table.png";
import {MapNavigation} from "@modules/MapNavigation/MapNavigation.tsx";

interface BoardProps {
    currentTile: ITile | undefined;
    setTooltip: React.Dispatch<React.SetStateAction<string>>;
    endOfTurn: () => void;
}

interface IMapTile extends ITile {
    coords: {
        x: number;
        y: number;
    };
}

export const Board: React.FC<BoardProps> = ({
                                                currentTile,
                                                setTooltip,
                                                endOfTurn
                                            }) => {

    const tileSize = 198;
    const mapSize = tileSize * 70;
    const mapCenter = mapSize / 2 - tileSize / 2;
    const mapNavigationRef = useRef<HTMLUListElement>(null);
    const [mapScale, setMapScale] = useState(1);
    const [map, setMap] = useState<IMapTile[]>([
        // Start tile
        {
            id: 0,
            design: "D",
            borders: ['city', 'road', 'field', 'road'],
            neighbors: [false, false, false, false],
            pennant: false,
            rotation: 0,
            coords: {x: mapCenter - mapCenter % tileSize, y: mapCenter - mapCenter % tileSize}
        }
    ]);

    const [wrongAnimation, setWrongAnimation] = useState(false);

    /* ----- Tile cursor ----- */
    const [position, setPosition] = useState({x: 0, y: 0});
    const [showTile, setShowTile] = useState(false);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        console.log(123123);
        const {clientX, clientY} = event;
        setPosition({x: clientX, y: clientY});
    };

    const handleMouseEnter = () => {
        setShowTile(true);
    };

    const handleMouseLeave = () => {
        setShowTile(false);
    };
    /* ----- Tile cursor ----- */


    /**
     * Place the current tile on the map by click
     * @param e
     * @returns
     */
    const placeTile = (e: MouseEvent<HTMLDivElement>) => {
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
            return false;
        }

        /* --- ====================================== --- */

        // Add tile to the map
        setMap(map => ([
            ...map,
            tile
        ]));

        endOfTurn();
    };

    /**
     * Check if the tile can be placed on the map by the rules
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

    return (
        <div
            className={twJoin(
                "h-full w-full relative",
                showTile && currentTile && "cursor-none"
            )}
            onMouseMove={handleMouseMove}
            onMouseOver={handleMouseEnter}
            onMouseOut={handleMouseLeave}
            onClick={placeTile}
        >

            {/* Show cursor with the current tile */}
            {showTile && currentTile && (
                <img
                    className="pointer-events-none"
                    draggable="false"
                    src={`/tiles/${currentTile.design}.png`} // Укажите путь к вашей картинке
                    alt=""
                    style={{
                        position: 'absolute',
                        left: position.x - tileSize * mapScale / 2 + 'px', // Смещение относительно курсора
                        top: position.y - tileSize * mapScale / 2 - 50 + 'px',
                        width: tileSize * mapScale + 'px',
                        height: tileSize * mapScale + 'px',
                        transform: `rotate(${90 * currentTile.rotation}deg)`,
                        zIndex: 100, // Задайте z-index, чтобы изображение было выше остальных элементов
                    }}
                />
            )}

            {/* Map */}
            <MapNavigation
                tileSize={tileSize}
                mapSize={mapSize}
                mapCenter={mapCenter}
                setForwardScale={setMapScale}
            >
                <ul
                    style={{
                        position: 'relative',
                        width: mapSize + "px",
                        height: mapSize + "px",
                        background: `url(${tableImage})`,
                        backgroundRepeat: "repeat"
                    }}
                    ref={mapNavigationRef}
                >
                    {map.map(tile => {
                        return (
                            <li
                                key={tile.id}
                                style={{
                                    position: 'absolute',
                                    top: tile.coords.y,
                                    left: tile.coords.x,
                                }}
                            >
                                <img
                                    className="rounded-sm shadow-md"
                                    src={`/tiles/${tile.design}.png`}
                                    draggable="false"
                                    alt=""
                                    style={{
                                        width: tileSize + 'px',
                                        height: tileSize + 'px',
                                        transform: `rotate(${90 * tile.rotation}deg)`
                                    }}
                                />
                            </li>
                        );
                    })}

                </ul>
            </MapNavigation>


        </div>
    );
};