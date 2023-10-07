import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { Page } from "@modules/PageTemplates";
import TilesDeck, { ITile } from "./classes/TilesDeck";
import { Board } from "./modules/Board/Board";

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
                rotation: tile.rotation + rotateValue,
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

    return (
        <Page
            className="w-screen pt-0"
        >
            <Helmet>
                <title>СмолКассон</title>
                <link rel="canonical" href={import.meta.env.VITE_APP_URL + '/game'} />
            </Helmet>

            <Board
                currentTile={currentTile}
                setTooltip={setTooltip}
                endOfTurn={endOfTurn}
            />
        </Page>
    );
};