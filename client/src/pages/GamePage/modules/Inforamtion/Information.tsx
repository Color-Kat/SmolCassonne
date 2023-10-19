import React, {memo} from 'react';
import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {Unit} from "@pages/GamePage/classes/Units.ts";

interface InformationProps {
    tileInformation: Tile | null;
    unitInformation: Unit | null;
    tooltip: string;
}

export const Information: React.FC<InformationProps> = memo(({
                                                             tileInformation,
                                                             unitInformation,
                                                             tooltip
                                                             }) => {


    if(tooltip)
        return (
            <div className="absolute right-0 bottom-0 bg-black/40 rounded-tl-xl z-50 p-4 text-gray-100">
                <h3 className="text-xl font-semibold">Подсказка</h3>
                <p className="text-gray-300">{tooltip}</p>
            </div>
        );

    return null;
});