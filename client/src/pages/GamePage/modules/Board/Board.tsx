import React, {MouseEvent, useRef, useState, useEffect, Fragment, useCallback} from "react";
import {twJoin, twMerge} from "tailwind-merge";

import {ITile, Tile} from "../../classes/TilesDeck";

import {MapNavigation} from "@modules/MapNavigation/MapNavigation.tsx";
import {useTileCursor} from "./hooks/useTileCursor.tsx";
import {Dialog, Transition} from "@headlessui/react";

import tableWoodImage from "@assets/textures/tableWood.png";
import {UnitSelector} from "@pages/GamePage/modules/UnitSelector/UnitSelector.tsx";
import {Unit, units} from "@pages/GamePage/classes/Units.ts";
import {MapTile} from "@pages/GamePage/modules/Board/components/MapTile.tsx";
import {MapContext} from "@pages/GamePage/mapContext.ts";
import {TilesMap} from "@pages/GamePage/classes/TilesMap.ts";


interface BoardProps {
    currentTile: Tile | undefined;
    setCurrentTile: React.Dispatch<React.SetStateAction<Tile | undefined>>;

    units: { [key: string]: Unit[] };
    myTeam: string;

    endOfTurn: () => void;
}


/**
 * This component renders the board: tile cursor, map with tile, units, unit selector.
 * And Board component is responsible for game mechanics realization
 * and the game stage management (Place tile, Place Unit, Calculate score).
 *
 */
export const Board: React.FC<BoardProps> = ({
                                                currentTile,
                                                setCurrentTile,

                                                units, myTeam,

                                                endOfTurn
                                            }) => {
    const {map, setMap, tileSize, setTooltip} = React.useContext(MapContext);

    const mapSize = tileSize * 70;
    const mapCenter = mapSize / 2 - tileSize / 2;
    const mapNavigationRef = useRef<HTMLUListElement>(null);
    const [mapScale, setMapScale] = useState(1);

    // Set starting map with one default tile (Empty map - stage )
    useEffect(() => {
        setMap((new TilesMap())
            .getStartingMap(mapCenter, tileSize));
    }, []);

    // Tile cursor (Place tile - stage 1)
    const {
        handleMouseMove,
        handleMouseEnter,
        handleMouseLeave,

        placeTile,
        PlacedTile,

        tilePosition,
        showTile,
        wrongAnimation,

        TileCursor,
    } = useTileCursor({
        tileSize,
        mapScale,
        mapNavigationRef,
        map,
        setMap,

        currentTile,

        placeTileCallback: () => {
            setTooltip('');
            setCurrentTile(undefined);
            setIsSelectingUnit(true);
        }
    });

    // Unit selector (Unit selection - stage 2)
    const [isSelectingUnit, setIsSelectingUnit] = useState(false);

    // Score calculation (Scoring - Stage 3)
    const scoring = () => {
        console.log(123)
        // const score = (new TilesMap(map)).calculateScore();

        endOfTurn();
    }

    return (
        <div
            className={twJoin(
                "h-full w-full relative"
            )}
            // Tile-cursor
            onMouseMove={handleMouseMove}
            onMouseOver={handleMouseEnter}
            onMouseOut={handleMouseLeave}
            onClick={placeTile}
        >

            {/* Show cursor with the current tile */}
            {showTile && currentTile &&
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
            }
            {/*<TileCursor />*/}

            {/* Unit Selector */}
            <UnitSelector
                units={units[myTeam]}
                PlacedTile={PlacedTile}

                isSelectingUnit={isSelectingUnit}
                setIsSelectingUnit={setIsSelectingUnit}

                placeUnitCallback={scoring}
            />

            {/* Class loader for debug */}
            <div className="hidden border-r-4 border-b-4 border-t-4 border-l-4 border-red-500"></div>
            <div className="hidden border-r-8 border-b-8 border-t-8 border-l-8 border-red-500"></div>

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
                        background: `url(${tableWoodImage})`,
                        backgroundRepeat: "repeat"
                    }}
                    ref={mapNavigationRef}
                >
                    {map.map(tile => (
                        <MapTile
                            key={tile.id}
                            tile={tile}
                            tileSize={tileSize}
                        />
                    ))}

                </ul>
            </MapNavigation>
        </div>
    );
};