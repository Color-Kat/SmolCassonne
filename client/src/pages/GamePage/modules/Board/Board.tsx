import React, {MouseEvent, useRef, useState, useEffect, Fragment, useCallback} from "react";
import {twJoin, twMerge} from "tailwind-merge";

import {ITile} from "../../classes/TilesDeck";

import {MapNavigation} from "@modules/MapNavigation/MapNavigation.tsx";
import {IMapTile} from "@pages/GamePage/modules/Board/types.ts";
import {useTileCursor} from "./hooks/useTileCursor.tsx";
import {Dialog, Transition} from "@headlessui/react";

import tableWoodImage from "@assets/textures/tableWood.png";
import {UnitSelector} from "@pages/GamePage/modules/UnitSelector/UnitSelector.tsx";
import {Unit, units} from "@pages/GamePage/classes/Units.ts";


interface BoardProps {
    map: IMapTile[];
    setMap: React.Dispatch<React.SetStateAction<IMapTile[]>>;

    currentTile: ITile | undefined;
    setCurrentTile: React.Dispatch<React.SetStateAction<ITile | undefined>>;

    units: {[key: string]: Unit[]};
    myTeam: string;

    setTooltip: React.Dispatch<React.SetStateAction<string>>;
    endOfTurn: () => void;
}

export const Board: React.FC<BoardProps> = ({
                                                map, setMap,

                                                currentTile,
                                                setCurrentTile,

                                                units, myTeam,

                                                setTooltip,
                                                endOfTurn
                                            }) => {

    const tileSize = 198;
    const mapSize = tileSize * 70;
    const mapCenter = mapSize / 2 - tileSize / 2;
    const mapNavigationRef = useRef<HTMLUListElement>(null);
    const [mapScale, setMapScale] = useState(1);

    useEffect(() => {
        // Set start tile
        setMap([{
            id: 0,
            design: "D",
            borders: ['city', 'road', 'field', 'road'],
            neighbors: [false, false, false, false],
            pennant: false,
            rotation: 0,
            coords: {x: mapCenter - mapCenter % tileSize, y: mapCenter - mapCenter % tileSize}
        }]);
    }, []);

    const [isSelectingUnit, setIsSelectingUnit] = useState(false);
    const openUnitSelectorModal = () => {

        setCurrentTile(undefined);
        setIsSelectingUnit(true);

        // endOfTurn();
    };

    const {
        showTile,
        tilePosition,
        handleMouseMove,
        handleMouseEnter,
        handleMouseLeave,
        placeTile,
        PlacedTile
    } = useTileCursor({
        tileSize,
        mapScale,
        mapNavigationRef,
        map,
        setMap,

        currentTile,
        setTooltip,

        placeTileCallback: openUnitSelectorModal
    });

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
            {showTile && currentTile && (
                <img
                    className="pointer-events-none"
                    draggable="false"
                    src={`/tiles/${currentTile.design}.png`}
                    alt=""
                    style={{
                        position: 'absolute',
                        left: tilePosition.x - tileSize * mapScale / 2 + 'px',
                        top: tilePosition.y - tileSize * mapScale / 2 - 50 + 'px',
                        width: tileSize * mapScale + 'px',
                        height: tileSize * mapScale + 'px',
                        // transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
                        transform: `rotate(${90 * currentTile.rotation}deg)`,
                        zIndex: 100,
                    }}
                />
            )}

            {/* Unit Selector */}
            <UnitSelector
                isSelectingUnit={isSelectingUnit}
                setIsSelectingUnit={setIsSelectingUnit}
                units={units[myTeam]}
                PlacedTile={PlacedTile}
            />

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