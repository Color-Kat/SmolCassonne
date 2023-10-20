import React, {MouseEventHandler, ReactNode, useMemo, useState} from "react";
import {ITile} from "@pages/GamePage/classes/TilesDeck.ts";
import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {MapContext} from "@pages/GamePage/mapContext.ts";
import {twJoin} from "tailwind-merge";
import {current} from "@reduxjs/toolkit";


interface ITileCursorParams {
    tileSize: number;
    mapScale: number;
    mapNavigationRef: React.RefObject<HTMLUListElement>;
    map: Tile[];
    setMap: React.Dispatch<React.SetStateAction<Tile[]>>;

    currentTile: Tile | undefined;

    placeTileCallback: () => void;
}

export const useTileCursor = ({
                                  tileSize,
                                  mapScale,
                                  mapNavigationRef,
                                  map,
                                  setMap,

                                  currentTile,

                                  placeTileCallback

                              }: ITileCursorParams) => {
    const {setTooltip} = React.useContext(MapContext);

    const [wrongAnimation, setWrongAnimation] = useState(false);

    const [tilePosition, setTilePosition] = useState({x: 0, y: 0});
    const [showTile, setShowTile] = useState(false);
    const [placedTile, setPlacedTile] = useState<Tile | null>(null);

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
        const tile: Tile = currentTile;
        tile.setCoords(x - x % tileSize, y - y % tileSize);

        /* --- Check if tile can be placed on the map --- */
        if (!tile.checkIfFit(
            tileSize,
            map,
            setTooltip
        )) {
            setWrongAnimation(true);
            setTimeout(() => setWrongAnimation(false), 100);

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
     *
     * @constructor
     */
    const PlacedTile = () => {
        if (!placedTile) return null;

        return placedTile.Image(tileSize);
    }

    const TileCursor = () => {
        if (!(currentTile && showTile)) return null;

        return (
            <div
                className={twJoin(
                    "pointer-events-none",
                    wrongAnimation && "animate-shake"
                )}
                style={{
                    position: 'absolute',
                    width: tileSize * mapScale + 'px',
                    height: tileSize * mapScale + 'px',
                    left: tilePosition.x - tileSize * mapScale / 2 + 'px',
                    top: tilePosition.y - tileSize * mapScale / 2 - 50 + 'px',
                    zIndex: 100,

                }}
            >
                <img
                    className=""
                    draggable="false"
                    src={`/tiles/${currentTile.design}.png`}
                    alt=""
                    style={{
                        width: '100%',
                        height: '100%',
                        transform: `rotate(${90 * currentTile.rotation}deg)`,
                        transition: "transform 0.2s ease-in-out",
                    }}
                />
            </div>
        );
    }

    return {
        handleMouseMove,
        handleMouseEnter,
        handleMouseLeave,

        placeTile,
        PlacedTile,

        TileCursor
    };
};