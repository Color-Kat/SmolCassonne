import React, {memo} from 'react';
import {Unit} from "@pages/GamePage/classes/Units.ts";

interface SelectedUnitProps {
    selectedUnit: Unit | null;
}

export const SelectedUnit: React.FC<SelectedUnitProps> = memo(({selectedUnit}) => {


    return (
        <div className="absolute top-1/2 -translate-y-1/2 right-10 flex flex-col items-center cursor-default">
            <img src={selectedUnit?.image} alt={selectedUnit?.name} className="rounded-xl h-56"/>
            <div className="text-2xl font-bold text-gray-100 mt-3">
                {selectedUnit?.name.split(' ').at(-1)}
            </div>
            <div className="text-base text-gray-200 mt-1">
                {selectedUnit?.getRole()}
            </div>
            { selectedUnit?.isOccupied && <div className="text-base text-red-400 mt-1">
                Нельзя использовать
            </div>}
        </div>
    );
});