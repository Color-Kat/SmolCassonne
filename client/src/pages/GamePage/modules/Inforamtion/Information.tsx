import React, {memo, useCallback} from 'react';
import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import {MapContext} from "@pages/GamePage/gameContext.ts";

interface InformationProps {
    tileInformation: Tile | null;
    unitInformation: Unit | null;
    tooltip: string;
    infoMessage: string;

    setTileInformation: React.Dispatch<React.SetStateAction<Tile | null>>;
    setUnitInformation: React.Dispatch<React.SetStateAction<Unit | null>>;
    setInfoMessage: React.Dispatch<React.SetStateAction<string>>;
    setTooltip: React.Dispatch<React.SetStateAction<string>>;
}

export const Information: React.FC<InformationProps> = memo(({
                                                                 tileInformation,
                                                                 unitInformation,
                                                                 tooltip,
                                                                 infoMessage,

                                                                 setInfoMessage,
                                                                 setTooltip,
                                                                 setTileInformation,
                                                                 setUnitInformation,
                                                             }) => {

    const closeInformation = useCallback(() => {
        setInfoMessage('');
        setTooltip('');
        setUnitInformation(null);
        setTileInformation(null);
    }, []);

    if (infoMessage)
        return (
            <div className="absolute right-0 bottom-0 bg-black/40 rounded-tl-xl z-50 p-4 text-gray-100 cursor-pointer"
                 onClick={closeInformation}>
                {/*<h3 className="text-xl font-semibold">Информация</h3>*/}
                <p className="text-gray-300">{infoMessage}</p>
            </div>
        );

    if (tooltip)
        return (
            <div className="absolute right-0 bottom-0 bg-black/40 rounded-tl-xl z-50 p-4 text-gray-100 cursor-pointer"
                 onClick={closeInformation}>
                <h3 className="text-xl font-semibold">Подсказка</h3>
                <p className="text-gray-300">{tooltip}</p>
            </div>
        );

    if (unitInformation)
        return (
            <div
                className="absolute right-0 bottom-0 bg-black/40 rounded-tl-xl z-50 p-4 text-gray-100 max-w-2xl cursor-pointer"
                onClick={closeInformation}
            >
                <div className="flex flex-row gap-3">
                    <img src={unitInformation.image} alt={unitInformation.name} className="h-36 rounded-lg"/>

                    <div>
                        <h3 className="text-xl font-semibold">{unitInformation.name}</h3>
                        <p className="text-gray-300">{unitInformation.description}</p>
                        <a href={unitInformation.moreAbout} target="_blank" className="text-lg font-semibold text-indigo-400">Подробнее</a>
                    </div>
                </div>
            </div>
        );

    if (tileInformation && tileInformation.realPhoto)
        return (
            <div
                className="absolute right-0 bottom-0 bg-black/40 rounded-tl-xl z-50 p-4 text-gray-100 max-w-2xl cursor-pointer"
                onClick={closeInformation}
            >
                <div className="flex flex-row gap-3">
                    <img src={tileInformation.realPhoto} alt={tileInformation.name!} className="h-36 rounded-xl"/>

                    <div>
                        <h3 className="text-xl font-semibold">{tileInformation.name}</h3>
                        <p className="text-gray-300">{tileInformation.description!}</p>
                        <a href={tileInformation.moreAbout ?? '#'} target="_blank" className="text-lg font-semibold text-indigo-400">Подробнее</a>

                    </div>
                </div>
            </div>
        );

    return null;
});