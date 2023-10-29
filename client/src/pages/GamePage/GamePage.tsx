import {Helmet} from "react-helmet";
import React, {useState} from "react";
import TilesDeck, {Tile} from "./classes/TilesDeck";
import {Unit, units as listOfUnits} from "./classes/Units.ts";
import {Board} from "./modules/Board/Board";

import {ControlPanel} from "@pages/GamePage/modules/ControlPanel/ControlPanel.tsx";
import {Teams} from "@pages/GamePage/modules/Teams/Teams.tsx";
import {GameStageContext, GameStagesType, MapContext} from "@pages/GamePage/gameContext.ts";
import {Information} from "@pages/GamePage/modules/Inforamtion/Information.tsx";
import {defaultTeams} from "@pages/GamePage/classes/teams.ts";

/**
 * This component renders the game page.
 * It is responsible for global state of the game,
 * and it provides an interface for multiplayer realization.
 *
 * @constructor
 */
export const GamePage = () => {

    const myTeamColor = 'blue';

    const [teams, setTeams] = useState(defaultTeams);

    // State with current stage of the game
    const [stage, setStage] = useState<GameStagesType>('emptyMap');

    // States for information about current tile, unit and tooltip.
    const [tileInformation, setTileInformation] = useState<Tile | null>(null);
    const [unitInformation, setUnitInformation] = useState<Unit | null>(null);
    const [tooltip, setTooltip] = useState("");

    // Get shuffled deck of tiles
    const [deck, setDeck] = useState((new TilesDeck()).getShuffledDeck());
    const [units, setUnits] = useState(listOfUnits);
    const [map, setMap] = useState<Tile[]>([]);

    // State for current tile
    const [currentTile, setCurrentTile] = useState<Tile | undefined>(undefined);

    const endOfTurn = () => {
        // Hide tooltip, tile and unit information
        setTooltip("");
        setTileInformation(null);
        setUnitInformation(null);

        // Clear current tile
        setCurrentTile(undefined);

        // Pass the turn to the next player
        // passTheTurn() 
    };
    // console.log(map);

    return (
        <GameStageContext.Provider value={{
            stage,
            setStage
        }}>
            <div className="w-full h-full cursor-default">
                <Helmet>
                    <title>СмолКассон</title>
                    <link rel="canonical" href={import.meta.env.VITE_APP_URL + '/game'}/>
                </Helmet>

                <MapContext.Provider value={{
                    myTeamColor,
                    teams,
                    setTeams,

                    tileSize: 192,
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
                        />

                        {/* Board with the map */}
                        <Board
                            currentTile={currentTile}
                            setCurrentTile={setCurrentTile}

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
        </GameStageContext.Provider>
    );
};