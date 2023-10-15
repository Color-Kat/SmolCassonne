import React, {memo} from 'react';
import tableWoodImage from "@assets/textures/tableWood.png";
import {twJoin} from "tailwind-merge";

interface PlaceSelectorProps {
    PlacedTile: any;
    closeSelectingUnit: () => void;
}

interface UnitPlaceProps {
    position: 0 | 1 | 2 | 3;
}

const UnitPlace: React.FC<UnitPlaceProps> = memo(({
                                                      position
                                                  }) => {
    return (
        <button
            className={twJoin(
                "rounded-full bg-gray-300/30 border-2 border-gray-300 w-12 h-12 absolute z-10",
                "hover:bg-gray-300/50",
                position === 0 && "top-0 left-1/2 -translate-x-1/2",
                position === 1 && "right-0 top-1/2 -translate-y-1/2",
                position === 2 && "bottom-0 left-1/2 -translate-x-1/2",
                position === 3 && "left-0 top-1/2 -translate-y-1/2"
            )}
        ></button>
    );
});

export const PlaceSelector: React.FC<PlaceSelectorProps> = memo(({
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

                <UnitPlace position={0}/>
                <UnitPlace position={1}/>
                <UnitPlace position={2}/>
                <UnitPlace position={3}/>

                <PlacedTile/>
            </div>

            <button onClick={closeSelectingUnit}
                    className="text-gray-200 px-8 py-1.5 rounded-md bg-gray-300/20 hover:bg-gray-300/40 w-max mx-auto">
                Пропустить
            </button>
        </div>
    );
});