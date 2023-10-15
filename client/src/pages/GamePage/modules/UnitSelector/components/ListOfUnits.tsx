import React, {memo, useCallback} from 'react';
import tableWoodImage from "@assets/textures/tableWood.png";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import {twJoin} from "tailwind-merge";

interface ListOfUnitsProps {
    units: Unit[];
    selectedUnit: Unit | null;
    setSelectedUnit: React.Dispatch<React.SetStateAction<Unit | null>>;
}

interface UnitCardProps {
    unit: Unit;
    selectedUnit: Unit | null;
    setSelectedUnit: React.Dispatch<React.SetStateAction<Unit | null>>;
}

const UnitCard: React.FC<UnitCardProps> = memo(({
                                                    unit,
                                                    selectedUnit,
                                                    setSelectedUnit
                                                }) => {

    const handleUnitClick = useCallback(() => {
        if(selectedUnit?.id === unit.id) setSelectedUnit(null);
        else setSelectedUnit(unit);
    }, [selectedUnit]);

    return (
        <li
            className={twJoin(
                "flex items-center flex-col hover:bg-gray-300/30 rounded-lg p-1 w-32",
                unit.id == selectedUnit?.id && "bg-gray-300/50"
            )}
            onClick={handleUnitClick}
        >
            <img
                src={unit.image}
                alt={unit.name}
                className={twJoin(
                    "object-contain h-24 cursor-pointer rounded-lg",
                    unit.occupied && "opacity-50 border-4 border-red-400"
                )}
            />

            <div className="text-sm text-gray-100">
                {unit.name.split(' ').at(-1)}
            </div>
            {unit.occupied && <div className="text-xs text-gray-300">
                Используется
            </div>}
        </li>
    );
});

export const ListOfUnits: React.FC<ListOfUnitsProps> = memo(({
                                                                 units,
                                                                 selectedUnit,
                                                                 setSelectedUnit
                                                             }) => {


    return (
        <div className="absolute bottom-0 w-full h-36 cursor-default">
            <ul
                className="max-w-3xl w-full h-full mx-auto rounded-t-xl flex gap-5 items-center px-4 py-4"
                style={{
                    background: `url(${tableWoodImage})`,
                    backgroundRepeat: "repeat"
                }}
            >
                {units.map(unit => (
                    <UnitCard
                        key={unit.id}
                        unit={unit}
                        selectedUnit={selectedUnit}
                        setSelectedUnit={setSelectedUnit}
                    />
                ))}
            </ul>
        </div>
    );
});