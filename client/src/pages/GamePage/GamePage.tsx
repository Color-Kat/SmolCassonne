import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { Page } from "@modules/PageTemplates";
import TilesDeck, { ITile } from "./classes/TilesDeck";
import { Board } from "./modules/Board/Board";

import tileBack from "@assets/tileBack.jpg"

export const GamePage = () => {
    // Get shuffled deck of tiles
    const [deck, setDeck] = useState((new TilesDeck()).getShuffledDeck());

    // State for current tile
    const [currentTile, setCurrentTile] = useState<ITile | undefined>(undefined);

    // States for information about current tile and moves
    const [tileInformation, setTitleInformation] = useState("");
    const [tooltip, setTooltip] = useState("")

    const takeTile = () => {
        if (deck.length == 0) return;

        const deckCopy = [...deck];
        setCurrentTile(deckCopy.pop()); // Retrieve the last tile in the deck

        // Save deck without the last tile
        setDeck(deckCopy);
    }

    const rotateTile = (rotateValue: number) => {
        if (!currentTile) return;

        setCurrentTile((tile) => (tile ?
            {
                ...tile,
                rotation: (tile.rotation + rotateValue) % 4,
            } : undefined
        ));
    }

    const rotateTileLeft = () => rotateTile(-1);
    const rotateTileRight = () => rotateTile(1);

    const endOfTurn = () => {
        // Reset tooltip
        setTooltip("");

        // Show information about placed tile
        setTitleInformation("Information");

        // Clear current tile
        setCurrentTile(undefined);

        // Pass the turn to the next player
        // passTheTurn() 
    }

    console.log(currentTile);

    return (
        <div className="w-full">
            <Helmet>
                <title>СмолКассон</title>
                <link rel="canonical" href={import.meta.env.VITE_APP_URL + '/game'} />
            </Helmet>

            <div className="flex">
                {/* Control Panel */}
                <div className="h-screen flex flex-col items-center px-3 py-5 bg-gray-300 w-56 relative">
                    <div className="w-48 h-48 relative mb-16">
                        {/* Top tile */}
                        <img
                            src={currentTile ? `/tiles/${currentTile.design}.png` : tileBack}
                            alt=""
                            className="z-10 absolute top-2 hover:top-0 cursor-pointer w-full h-full"
                        />
                        <img src={tileBack} alt="" className="absolute w-full top-8" />
                        <img src={tileBack} alt="" className="absolute w-full top-6" />
                        <img src={tileBack} alt="" className="absolute w-full top-4" />
                    </div>

                    <button
                        className="w-full h-12 bg-zinc-500/70 hover:bg-zinc-500/50 rounded-md font-bold text-lg text-white mb-2"
                        onClick={takeTile}
                    >
                        Взять тайл
                    </button>

                    <div className="flex justify-between w-full gap-3">
                        <button onClick={rotateTileLeft} className="h-8 bg-zinc-500/70 hover:bg-zinc-500/50 rounded-md text-white flex-1">Влево</button>
                        <button onClick={rotateTileRight} className="h-8 bg-zinc-500/70 hover:bg-zinc-500/50 rounded-md text-white flex-1">Вправо</button>
                    </div>
                </div>


                {/* Board with map */}
                <Board
                    currentTile={currentTile}
                    setTooltip={setTooltip}
                    endOfTurn={endOfTurn}
                />

                {/* Information about placed tile */}
                <div className="">

                </div>

                {/* User score */}
                <div className="">

                </div>

            </div>
        </div>
    );
};