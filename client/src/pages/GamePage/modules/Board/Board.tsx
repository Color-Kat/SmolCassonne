import { Helmet } from "react-helmet";
import React, { useState } from "react";
import TilesDeck, { ITile } from "../../classes/TilesDeck";

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
    const [map, setMap] = useState();

    // const getClickPosition(e, spaces, tileSize) {
    //     let x = e.clientX
    //     let y = e.clientY
    
    //     let placement = spaces.filter(space => {
    //         return (_.inRange(y, space[0], space[0]+tileSize)) &&   (_.inRange(x, space[1], space[1]+tileSize))
    //       // update neighbor to true
    //     })
    //     placeTile(placement[0])
    //   }

    return (
        <div className="">

        </div>
    );
};