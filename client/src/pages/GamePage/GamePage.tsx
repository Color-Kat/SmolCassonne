import {Helmet} from "react-helmet";
import React, {useState} from "react";
import TilesDeck, {Tile} from "./classes/TilesDeck";
import {Unit, units as listOfUnits} from "./classes/Units.ts";
import {Board} from "./modules/Board/Board";

import {ControlPanel} from "@pages/GamePage/modules/ControlPanel/ControlPanel.tsx";
import {Teams} from "@pages/GamePage/modules/Teams/Teams.tsx";
import {MapContext} from "@pages/GamePage/mapContext.ts";
import {Information} from "@pages/GamePage/modules/Inforamtion/Information.tsx";

export const GamePage = () => {
    const myTeam = 'blue';
    const teams = ['blue'];

    // Get shuffled deck of tiles
    const [deck, setDeck] = useState((new TilesDeck()).getShuffledDeck());
    const [units, setUnits] = useState(listOfUnits);

    const tileSize = 192;
    const [map, setMap] = useState<Tile[]>([]);

    // State for current tile
    const [currentTile, setCurrentTile] = useState<Tile | undefined>(undefined);

    // States for information about current tile and moves
    const [tileInformation, setTileInformation] = useState<Tile | null>(null);
    const [unitInformation, setUnitInformation] = useState<Unit | null>(null);
    const [tooltip, setTooltip] = useState("");

    const endOfTurn = () => {
        // Reset tooltip
        setTooltip("");

        // Hide information about placed tile and unit
        setTileInformation(null);
        setUnitInformation(null);

        // Clear current tile
        setCurrentTile(undefined);

        // Pass the turn to the next player
        // passTheTurn() 
    };
    // console.log(map);

    return (
        <div className="w-full h-full cursor-default">
            <Helmet>
                <title>СмолКассон</title>
                <link rel="canonical" href={import.meta.env.VITE_APP_URL + '/game'}/>
            </Helmet>

            <MapContext.Provider value={{
                myTeam,
                tileSize,
                map,
                setMap,
                currentTile,
                setTooltip,
                setTileInformation,
                setUnitInformation,
                endOfTurn
            }}>
                <div className="flex h-full w-full relative">
                    {/* Control panel with buttons and the deck of tiles */}
                    <ControlPanel
                        currentTile={currentTile}
                        setCurrentTile={setCurrentTile}
                        deck={deck}
                        setDeck={setDeck}
                    />

                    {/* Users list and score */}
                    <Teams
                        teams={teams}
                        units={units}
                    />

                    {/* Board with the map */}
                    <Board
                        map={map}
                        setMap={setMap}

                        currentTile={currentTile}
                        setCurrentTile={setCurrentTile}

                        myTeam={myTeam}
                        units={units}

                        endOfTurn={endOfTurn}
                    />

                    {/* Information about placed tile */}
                    <Information
                        tileInformation={tileInformation}
                        unitInformation={unitInformation}
                        tooltip={tooltip}
                    />
                </div>
            </MapContext.Provider>
        </div>
    );
};