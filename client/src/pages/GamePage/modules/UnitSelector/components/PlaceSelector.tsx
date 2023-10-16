import React, {memo} from 'react';
import tableWoodImage from "@assets/textures/tableWood.png";
import {twJoin} from "tailwind-merge";
import {IMapTile} from "@pages/GamePage/modules/Board/types.ts";
import {Unit} from "@pages/GamePage/classes/Units.ts";

interface PlaceSelectorProps {
    selectedUnit: Unit | null;
    setMap: React.Dispatch<React.SetStateAction<IMapTile[]>>;
    PlacedTile: any;

    closeSelectingUnit: () => void;
}

interface UnitPlaceProps {
    position: 0 | 1 | 2 | 3;
    setMap: React.Dispatch<React.SetStateAction<IMapTile[]>>;
    disabled: boolean;
}

const UnitPlace: React.FC<UnitPlaceProps> = memo(({
                                                      position,
                                                      setMap,
                                                      disabled
                                                  }) => {

    const placeUnit = () => {
        setMap(prev => {
            const newMap = [...prev];
            // newMap[newMap.length - 1] = {
            //     ...newMap.at(-1),
            //     design: 'C'
            // };
            return newMap;
        });
    };

    return (
        <button
            className={twJoin(
                "rounded-full bg-gray-300/30 border-2 border-gray-300 w-12 h-12 absolute z-10",
                !disabled && "hover:bg-gray-300/50",
                position === 0 && "top-0 left-1/2 -translate-x-1/2",
                position === 1 && "right-0 top-1/2 -translate-y-1/2",
                position === 2 && "bottom-0 left-1/2 -translate-x-1/2",
                position === 3 && "left-0 top-1/2 -translate-y-1/2"
            )}
            disabled={disabled}
            onClick={placeUnit}
        ></button>
    );
});

export const PlaceSelector: React.FC<PlaceSelectorProps> = memo(({
                                                                     selectedUnit,
                                                                     setMap,
                                                                     PlacedTile,
                                                                     closeSelectingUnit,
                                                                 }) => {



    return (
        <div
            className="bg-white p-4 rounded-xl shadow-xl max-w-sm w-full flex flex-col justify-center gap-5 cursor-default"
            style={{
                background: `url(${tableWoodImage})`,
                backgroundRepeat: "repeat"
            }}
        >
            <h2 className="text-xl text-white font-semibold text-center">
                Установка фишки
            </h2>

            <div className="mx-auto w-max h-max relative">

                <UnitPlace position={0} setMap={setMap} disabled={!selectedUnit}/>
                <UnitPlace position={1} setMap={setMap} disabled={!selectedUnit}/>
                <UnitPlace position={2} setMap={setMap} disabled={!selectedUnit}/>
                <UnitPlace position={3} setMap={setMap} disabled={!selectedUnit}/>

                <PlacedTile/>
            </div>

            <button onClick={closeSelectingUnit}
                    className="text-gray-200 px-8 py-1.5 rounded-md bg-gray-300/20 hover:bg-gray-300/40 w-max mx-auto">
                Пропустить
            </button>
        </div>
    );
});