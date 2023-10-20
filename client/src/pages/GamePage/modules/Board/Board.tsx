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


interface BoardProps {
    map: Tile[];
    setMap: React.Dispatch<React.SetStateAction<Tile[]>>;

    currentTile: Tile | undefined;
    setCurrentTile: React.Dispatch<React.SetStateAction<Tile | undefined>>;

    units: { [key: string]: Unit[] };
    myTeam: string;

    endOfTurn: () => void;
}

export const Board: React.FC<BoardProps> = ({
                                                map, setMap,

                                                currentTile,
                                                setCurrentTile,

                                                units, myTeam,

                                                endOfTurn
                                            }) => {
    const {setTooltip} = React.useContext(MapContext);

    const tileSize = 192;
    const mapSize = tileSize * 70;
    const mapCenter = mapSize / 2 - tileSize / 2;
    const mapNavigationRef = useRef<HTMLUListElement>(null);
    const [mapScale, setMapScale] = useState(1);

    useEffect(() => {
        // Set start tile
        setMap([new Tile({
            id: 0,
            design: "D",
            borders: ['city', 'road', 'field', 'road'],
            pennant: false,
            coords: {x: mapCenter - mapCenter % tileSize, y: mapCenter - mapCenter % tileSize}
        })]);
    }, []);

    const [isSelectingUnit, setIsSelectingUnit] = useState(false);
    const openUnitSelectorModal = () => {
        setTooltip('');
        setCurrentTile(undefined);

        setIsSelectingUnit(true);
    };

    const {
        handleMouseMove,
        handleMouseEnter,
        handleMouseLeave,

        placeTile,
        PlacedTile,

        TileCursor,
    } = useTileCursor({
        tileSize,
        mapScale,
        mapNavigationRef,
        map,
        setMap,

        currentTile,

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
            <TileCursor />

            {/* Unit Selector */}
            <UnitSelector
                isSelectingUnit={isSelectingUnit}
                setIsSelectingUnit={setIsSelectingUnit}
                PlacedTile={PlacedTile}
                units={units[myTeam]}
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