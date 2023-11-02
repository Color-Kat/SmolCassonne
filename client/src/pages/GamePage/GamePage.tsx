import {Helmet} from "react-helmet";
import React, {useCallback, useEffect, useRef, useState} from "react";
import TilesDeck, {Tile} from "./classes/TilesDeck";
import {Unit, units as listOfUnits} from "./classes/Units.ts";
import {Board} from "./modules/Board/Board";

import {ControlPanel} from "@pages/GamePage/modules/ControlPanel/ControlPanel.tsx";
import {Teams} from "@pages/GamePage/modules/Teams/Teams.tsx";
import {GameStageContext, GameStagesType, MapContext} from "@pages/GamePage/gameContext.ts";
import {Information} from "@pages/GamePage/modules/Inforamtion/Information.tsx";
import {defaultTeams, TeamColorType, TeamsType} from "@pages/GamePage/classes/teams.ts";
import {useMultiplayer} from "@pages/GamePage/hooks/useMultiplayer.ts";
import {IUser} from "@/store/auth/auth.slice.ts";
import {RainbowLoader} from "@UI/Loaders";

/**
 * This component renders the game page.
 * It is responsible for global state of the game,
 * and it provides an interface for multiplayer realization.
 *
 * @constructor
 */
export const GamePage = () => {
    const roomId = '1';
    const user: IUser = {
        id: 1,
        name: 'ColorKat',
    };

    const [myTeamColor, setMyTeamColor] = useState<TeamColorType|null>(null); // Will be set by server
    const [teams, setTeams] = useState(defaultTeams);

    // State with current stage of the game
    const [stage, setStage] = useState<GameStagesType>('emptyMap');

    // States for information about current tile, unit and tooltip.
    const [tileInformation, setTileInformation] = useState<Tile | null>(null);
    const [unitInformation, setUnitInformation] = useState<Unit | null>(null);
    const [tooltip, setTooltip] = useState("");

    // Get shuffled deck of tiles
    const [deck, setDeck] = useState((new TilesDeck()).getShuffledDeck());
    // Map state
    const [map, setMap] = useState<Tile[]>([]);
    // State for current tile
    const [currentTile, setCurrentTile] = useState<Tile | undefined>(undefined);

    // Retrieve methods for multiplayer
    const {joinRoom, passTheMove} = useMultiplayer({
        setMyTeamColor,
        map, setMap,
        teams, setTeams
    });

    useEffect(() => {
        setTimeout(() => {
            // Join user to the room
            joinRoom(roomId, user);
        }, 1000);
    }, []);

    /**
     * Reset information states, reset current tile.
     * Pass the move.
     *
     * @param updatedMap - use it because original map state is not updated here at the moment of running this function.
     */
    const endOfTurn = useCallback(() => {
        // Hide tooltip, tile and unit information
        setTooltip("");
        setTileInformation(null);
        setUnitInformation(null);

        // Clear current tile
        setCurrentTile(undefined);

        // Pass the turn to the next player
        handlePassTheMove(map, teams);
    }, [map, teams]);
    useEffect(() => {
        if (stage === 'endOfTurn') endOfTurn();
    }, [stage]);

    const handlePassTheMove = (updatedMap: Tile[], updatedTeams: TeamsType) => {
        // Change stage to wait
        setStage('wait');

        // Pass the move to the next player in the multiplayer
        passTheMove({
            roomId,
            user,
            data: {
                map: map,
                teams: teams
            }
        });

        setStage('takeTile');
    };

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

                {!myTeamColor && <RainbowLoader className="mt-24" />}

                {myTeamColor &&
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
                }
            </div>
        </GameStageContext.Provider>
    );
};