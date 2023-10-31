import React, {useRef, useState, useEffect, Fragment, useCallback, useContext} from "react";
import {twJoin} from "tailwind-merge";

import {Tile} from "../../classes/TilesDeck";

import {MapNavigation} from "@modules/MapNavigation/MapNavigation.tsx";
import {useTileCursor} from "./hooks/useTileCursor.tsx";

import tableWoodImage from "@assets/textures/tableWood.png";
import {UnitSelector} from "@pages/GamePage/modules/UnitSelector/UnitSelector.tsx";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import {MapTile} from "@pages/GamePage/modules/Board/components/MapTile.tsx";
import {GameStageContext, GameStagesType, MapContext} from "@pages/GamePage/gameContext.ts";
import {TilesMap} from "@pages/GamePage/classes/TilesMap.ts";
import {useLogoutMutation} from "@/store/auth/auth.api.ts";
import {TeamColorType} from "@pages/GamePage/classes/teams.ts";


interface BoardProps {
    currentTile: Tile | undefined;
    setCurrentTile: React.Dispatch<React.SetStateAction<Tile | undefined>>;

    endOfTurn: (updatedMap: Tile[]) => void;
}


/**
 * This component renders the board: tile cursor, map with tile, units, unit selector.
 * And the Board component is responsible for game mechanics realization
 * and the game stage management (Place tile, Place Unit, Calculate score).
 *
 */
export const Board: React.FC<BoardProps> = ({
                                                currentTile,
                                                setCurrentTile,

                                                endOfTurn
                                            }) => {
    const {
        tileSize,
        map,
        setMap,

        myTeamColor,
        setTeams,

        setTooltip,
    } = React.useContext(MapContext);

    const {setStage, stage} = useContext(GameStageContext);

    const mapSize = tileSize * 70;
    const mapCenter = mapSize / 2 - tileSize / 2;
    const mapNavigationRef = useRef<HTMLUListElement>(null);
    const [mapScale, setMapScale] = useState(1);

    // Management of game turn stages
    useEffect(() => {
        // Set starting map with one default tile (Empty map - stage 0)
        if (stage === 'emptyMap') {
            setMap((new TilesMap()).getStartingMap(mapCenter, tileSize));
            setStage('takeTile');
        }

        if (stage == 'tilePlaced') placeTileCallback();

        if (stage == 'unitPlaced') scoring();

        if (stage == 'endOfTurn') endOfTurn(map);
    }, [stage]);

    // ---------------------------------- //
    // - Tile cursor (Place tile stage) - //
    // ---------------------------------- //

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
    });

    // ---------------------------------------- //
    // - Unit selector (Unit selection stage) - //
    // ---------------------------------------- //

    const [isSelectingUnit, setIsSelectingUnit] = useState(false);
    const placeTileCallback = () => {
        setTooltip('');
        setCurrentTile(undefined);
        setIsSelectingUnit(true);
    };

    // ------------------------------------- //
    // - Score calculation (Scoring Stage) - //
    // ------------------------------------- //

    const scoring = () => {
        const result = (new TilesMap(map)).calculateScore(tileSize);
        const score = result.score;
        const freeUnitIds = result.freeUnitIds;

        // Update teams data
        setTeams(prev => {
            const newTeams = {...prev};

            // Mark free units as not occupied
            newTeams[myTeamColor].units.map(unit => freeUnitIds.includes(unit.id) ? unit.setOccupied(false) : unit);

            // Update score
            for(let teamColor in newTeams) {
                newTeams[teamColor as TeamColorType].score += score[teamColor] ?? 0;
            }

            return newTeams;
        });

        // Delete unit from the map
        setTimeout(() => {
            setMap(prev => {
                let newMap = [...prev];

                return newMap.map(tile => {
                    for (const unitPosition in tile.units) {
                        if (freeUnitIds.includes(tile.units[unitPosition]?.id ?? -1)) tile.units[unitPosition] = null;
                    }
                    return tile;
                });
            });
        }, 650);

        setStage('endOfTurn');
    };

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