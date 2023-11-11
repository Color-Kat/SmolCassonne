import React, {memo} from 'react';
import {Unit} from "@pages/GamePage/classes/Units.ts";

import tableWoodImage from "@assets/textures/tableWood.png";


interface SelectedUnitProps {
    selectedUnit: Unit | null;
}

export const SelectedUnit: React.FC<SelectedUnitProps> = memo(({selectedUnit}) => {

    let name = selectedUnit?.name.split(' ').at(-1);
    if(name == 'Конь') name = 'Фёдор Конь';

    if(!selectedUnit) return null;

    return (
        <div
            className="absolute top-1/2 -translate-y-1/2 right-10 h-72 flex gap-3 flex-co items-center cursor-default rounded-xl p-3 max-w-sm w-screen"
            style={{
                background: `url(${tableWoodImage})`,
                backgroundRepeat: "repeat"
            }}
        >
            <img src={selectedUnit?.image} alt={selectedUnit?.name} className="rounded-lg h-56"/>

            <div className="flex flex-col ">
                <div>
                    <div className="text-2xl font-bold text-gray-200">
                        {name}
                    </div>
                    <div className="text-base text-gray-200 mt-1">
                        {selectedUnit?.getRole()}
                    </div>
                    { selectedUnit?.isOccupied && <div className="text-base text-red-400 mt-1">
                        Нельзя использовать
                    </div>}
                </div>

                <div className="text-gray-200 mt-5">
                    {selectedUnit?.bonusDescription}
                </div>
            </div>
        </div>
    );
});