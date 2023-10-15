import React, {MouseEvent, useRef, useState, useEffect, Fragment, useCallback} from "react";
import {twJoin, twMerge} from "tailwind-merge";

import {ITile} from "../../classes/TilesDeck";

import {MapNavigation} from "@modules/MapNavigation/MapNavigation.tsx";
import {IMapTile} from "@pages/GamePage/modules/Board/types.ts";
import {useTileCursor} from "./hooks/useTileCursor.tsx";
import {Dialog, Transition} from "@headlessui/react";

import tableWoodImage from "@assets/textures/tableWood.png";


interface BoardProps {
    currentTile: ITile | undefined;
    setCurrentTile: React.Dispatch<React.SetStateAction<ITile | undefined>>;
    setTooltip: React.Dispatch<React.SetStateAction<string>>;
    endOfTurn: () => void;
}

export const Board: React.FC<BoardProps> = ({
                                                currentTile,
                                                setCurrentTile,
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

    const [isSelectingUnit, setIsSelectingUnit] = useState(false);
    const closeSelectingUnit = useCallback(() => setIsSelectingUnit(false), []);
    const handleOverlayClick = (e: MouseEvent) => {
        // Only close the modal if the click target is the outer div
        if (e.target === e.currentTarget)  closeSelectingUnit();
    };

    const openSelectingUnitModal = () => {

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

        placeTileCallback: openSelectingUnitModal
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
                        transform: `rotate(${90 * currentTile.rotation}deg)`,
                        zIndex: 100,
                    }}
                />
            )}

            {/* Place tile modal */}
            <Transition
                show={isSelectingUnit}
            >
                <Transition.Child
                    enter="transition-scale duration-300"
                    enterFrom="scale-110 -translate-y-8 opacity-0"
                    enterTo="scale-100 translate-y-0 opacity-100"
                    leave="transition-scale duration-300"
                    leaveFrom="scale-100 translate-y-0 opacity-100"
                    leaveTo="scale-110 translate-y-8 opacity-0"
                    className="transition-scale z-10 w-full h-full fixed inset-0"
                >

                    <div className="fixed inset-0 flex-center bg-black/30 backdrop-blur-s cursor-pointer" onClick={handleOverlayClick}>

                        <div
                            className="bg-white p-4 rounded-xl shadow-xl max-w-sm w-full flex flex-col justify-center gap-5 cursor-default"
                            style={{
                                background: `url(${tableWoodImage})`,
                                backgroundRepeat: "repeat"
                            }}
                        >
                            <h2 className="text-xl text-white font-semibold text-center">
                                Установка фишки
                            </h2>


                            <div className="mx-auto">
                                <PlacedTile />
                            </div>

                            <button onClick={closeSelectingUnit}>Пропустить</button>
                        </div>

                        <div className="absolute bottom-0 w-full h-36">
                            <div
                                className="max-w-4xl w-full h-full mx-auto rounded-t-xl"
                                style={{
                                    background: `url(${tableWoodImage})`,
                                    backgroundRepeat: "repeat"
                                }}
                            >

                            </div>
                        </div>
                    </div>

                </Transition.Child>
            </Transition>

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