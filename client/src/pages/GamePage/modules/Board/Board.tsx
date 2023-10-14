import React, {MouseEvent, useRef, useState, useEffect} from "react";
import {twJoin} from "tailwind-merge";

import {ITile} from "../../classes/TilesDeck";

import tableImage from "./assets/table.png";
import {MapNavigation} from "@modules/MapNavigation/MapNavigation.tsx";
import {IMapTile} from "@pages/GamePage/modules/Board/types.ts";
import {useTileCursor} from "./hooks/useTileCursor.tsx";

interface BoardProps {
    currentTile: ITile | undefined;
    setTooltip: React.Dispatch<React.SetStateAction<string>>;
    endOfTurn: () => void;
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

    const placeUnit = () => {
        console.log('place unit');

        endOfTurn();
    }

    const {TileCursor} = useTileCursor({
        tileSize,
        mapScale,
        mapNavigationRef,
        map,
        setMap,

        currentTile,
        setTooltip,

        placeTileCallback: placeUnit
    });

    return (
        <TileCursor>
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
        </TileCursor>
    );
};