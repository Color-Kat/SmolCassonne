import {Helmet} from "react-helmet";
import React, {useState, useEffect} from "react";
import TilesDeck, {ITile} from "./classes/TilesDeck";
import {Unit, units as listOfUnits} from "./classes/Units.ts";
import {Board} from "./modules/Board/Board";

import tileBack from "@assets/tileBack.jpg";
import {ControlPanel} from "@pages/GamePage/modules/ControlPanel/ControlPanel.tsx";
import {set} from "js-cookie";
import {Teams} from "@pages/GamePage/modules/Teams/Teams.tsx";
import {IMapTile} from "@pages/GamePage/modules/Board/types.ts";

export const GamePage = () => {
    const myTeam = 'blue';
    const teams = ['blue'];


    // Get shuffled deck of tiles
    const [deck, setDeck] = useState((new TilesDeck()).getShuffledDeck());
    const [units, setUnits] = useState(listOfUnits);

    const [map, setMap] = useState<IMapTile[]>([]);

    // State for current tile
    const [currentTile, setCurrentTile] = useState<ITile | undefined>(undefined);

    // States for information about current tile and moves
    const [tileInformation, setTitleInformation] = useState<ITile|null>(null);
    const [unitInformation, setUnitInformation] = useState<Unit|null>(null);
    const [tooltip, setTooltip] = useState("");

    const endOfTurn = () => {
        // Reset tooltip
        setTooltip("");

        // Show information about placed tile
        setTitleInformation(null);

        // Clear current tile
        setCurrentTile(undefined);

        // Pass the turn to the next player
        // passTheTurn() 
    };

    // console.log(currentTile);

    return (
        <div className="w-full h-full cursor-default">
            <Helmet>
                <title>СмолКассон</title>
                <link rel="canonical" href={import.meta.env.VITE_APP_URL + '/game'}/>
            </Helmet>

            <div className="flex h-full w-full relative">
                {/* Control panel with buttons and tiles deck */}
                <ControlPanel
                    currentTile={currentTile}
                    setCurrentTile={setCurrentTile}
                    deck={deck}
                    setDeck={setDeck}
                />

                {/* Users list and score */}
                <Teams
                    myTeam={myTeam}
                    teams={teams}
                    units={units}
                    setUnitInformation={setUnitInformation}
                />

                {/* Board with the map */}
                <Board
                    map={map}
                    setMap={setMap}

                    currentTile={currentTile}
                    setCurrentTile={setCurrentTile}

                    myTeam={myTeam}
                    units={units}

                    setTooltip={setTooltip}

                    endOfTurn={endOfTurn}
                />

                {/* Information about placed tile */}
                <div className="">

                </div>


            </div>
        </div>
    );
};