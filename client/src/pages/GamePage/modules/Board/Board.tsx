import { Helmet } from "react-helmet";
import React, { useState } from "react";
import TilesDeck from "../../classes/TilesDeck";

interface BoardProps {
    deck: TilesDeck;
}

export const Board: React.FC<BoardProps> = ({
    deck
}) => {
    return (
        <div className="">

        </div>
    );
};