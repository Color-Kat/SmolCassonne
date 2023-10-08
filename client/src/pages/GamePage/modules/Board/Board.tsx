import { Helmet } from "react-helmet";
import React, { MouseEvent, useRef, useState, useEffect } from "react";
import TilesDeck, { ITile } from "../../classes/TilesDeck";
import { twJoin } from "tailwind-merge";

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
    const [map, setMap] = useState<IMapTile[]>([]);

    /* ----- Map navigation ----- */
    const mapSize = tileSize * 70;

    const mapRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0); // Start dragging click position x
    const [startY, setStartY] = useState(0); // Start dragging click position y
    const [scrollLeft, setScrollLeft] = useState(mapSize / 2);
    const [scrollTop, setScrollTop] = useState(mapSize / 2);

    useEffect(() => {
        // Default scroll position
        mapRef.current!.scrollLeft = scrollLeft;
        mapRef.current!.scrollTop = scrollTop;
    }, []);

    const handleMouseDownOnMap = (e: React.MouseEvent) => {
        if (!mapRef.current) return;

        setIsDragging(true);
        setStartX(e.pageX);
        setStartY(e.pageY);
        setScrollLeft(mapRef.current.scrollLeft);
        setScrollTop(mapRef.current.scrollTop);
    };

    const handleMouseMoveOnMap = (e: React.MouseEvent) => {
        if (!isDragging) return;

        const x = e.clientX;
        const y = e.clientY;
        const walkX = (x - startX); // Adjust scroll speed here
        const walkY = (y - startY); // Adjust scroll speed here
        mapRef.current!.scrollLeft = scrollLeft - walkX;
        mapRef.current!.scrollTop = scrollTop - walkY;
    };

    const handleMouseUpOnMap = () => {
        setIsDragging(false);
    };
    /* ----- Map navigation ----- */

    /* ----- Tile cursor ----- */
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showTile, setShowTile] = useState(false);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = event;
        setPosition({ x: clientX, y: clientY });
    }

    const handleMouseEnter = () => {
        setShowTile(true);
    }

    const handleMouseLeave = () => {
        setShowTile(false);
    }
    /* ----- Tile cursor ----- */

    /**
     * Place current tile on the map by click
     * @param e 
     * @returns 
     */
    const placeTile = (e: MouseEvent<HTMLDivElement>) => {
        if (!currentTile) return;

        // Coords relative to the document
        let { clientX: x, clientY: y } = e;

        // Get map rect
        const rect = mapRef.current!.getBoundingClientRect();

        // Get coords raltive to the edges of the map
        x += mapRef.current!.scrollLeft - rect.left;
        y += mapRef.current!.scrollTop - rect.top;

        // Get the exact coords of the tile on the map
        const tile = {
            ...currentTile,
            coords: {
                x: x - x % tileSize,
                y: y - y % tileSize
            }
        }

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
    }

    const checkIfFit = (tile: IMapTile) => {
        let neighborsCount = 0

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
            if(tile.coords.y < mapTile.coords.y) {tileContactSide = 2; mapTileContactSide = 0;}
            if(tile.coords.y > mapTile.coords.y) {tileContactSide = 0; mapTileContactSide = 2;}
            if(tile.coords.x > mapTile.coords.x) {tileContactSide = 3; mapTileContactSide = 1;}
            if(tile.coords.x < mapTile.coords.x) {tileContactSide = 1; mapTileContactSide = 3;}

            // Take into account the rotation
            const tileBorderIndex = (4 + tileContactSide - tile.rotation) % 4;
            const mapTileBorderIndex = (4 + mapTileContactSide - mapTile.rotation) % 4

            // Get name of the contracted sides
            const tileBorder = tile.borders[tileBorderIndex];
            const mapTileBorder = mapTile.borders[mapTileBorderIndex];

            // We can't place the tile when at least one neighbor is not equal by the side
            if(tileBorder !== mapTileBorder) return false;
        }

        // We can place tile only by other tiles
        if(neighborsCount > 0) return true;
        else return false;
    }

    // const getClickPosition(e, spaces, tileSize) {
    //     let x = e.clientX
    //     let y = e.clientY

    //     let placement = spaces.filter(space => {
    //         return (_.inRange(y, space[0], space[0]+tileSize)) &&   (_.inRange(x, space[1], space[1]+tileSize))
    //       // update neighbor to true
    //     })
    //     placeTile(placement[0])
    //   }

    return (
        <div
            className={twJoin(
                "h-full w-full flex flex-1 relative",
                showTile && currentTile && "cursor-non"
            )}

            onMouseMove={handleMouseMove}
            onMouseOver={handleMouseEnter}
            onMouseOut={handleMouseLeave}
            onClick={placeTile}
        >
            {/* Show cursor with the current tile */}
            {showTile && currentTile && (
                <img
                    className=""
                    draggable="false"
                    src={`/tiles/${currentTile.design}.png`} // Укажите путь к вашей картинке
                    alt=""
                    style={{
                        position: 'absolute',
                        left: position.x - 200 - tileSize / 2 + 'px', // Смещение относительно курсора
                        top: position.y - 50 - tileSize / 2 + 'px',
                        width: tileSize + 'px',
                        height: tileSize + 'px',
                        transform: `rotate(${90 * currentTile.rotation}deg)`,
                        zIndex: 100, // Задайте z-index, чтобы изображение было выше остальных элементов
                    }}
                />
            )}

            {/* Map */}
            <div
                className="relative select-none no-scrollbar"
                style={{
                    width: "100%",
                    maxHeight: "100%",
                    height: "100%",
                    overflow: "scroll",
                    cursor: isDragging ? "grabbing" : "grab"
                }}
                ref={mapRef}
                onMouseDown={handleMouseDownOnMap}
                onMouseMove={handleMouseMoveOnMap}
                onMouseUp={handleMouseUpOnMap}
                onMouseLeave={handleMouseUpOnMap}
                // onTouchStart={handleMouseDownOnMap}
                // onTouchMove={handleMouseMoveOnMap}
                onTouchEnd={handleMouseUpOnMap}
            >
                <ul style={{
                    position: 'relative',
                    width: mapSize + "px",
                    height: mapSize + "px",
                }}>
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
                                    className="rounded-sm"
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
            </div>
        </div>
    );
};