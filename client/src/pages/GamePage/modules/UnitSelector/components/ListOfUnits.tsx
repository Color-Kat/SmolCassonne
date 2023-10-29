import React, {memo, useCallback} from 'react';
import tableWoodImage from "@assets/textures/tableWood.png";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import {twJoin} from "tailwind-merge";
import {MapContext} from "@pages/GamePage/gameContext.ts";

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
        if(selectedUnit?.id === unit.id) setSelectedUnit(null); // Unselect unit
        else if(selectedUnit?.isOccupied) setSelectedUnit(null); // Can't select occupied units
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
                    unit.isOccupied && "opacity-50 border-4 border-red-400"
                )}
            />

            <div className="text-sm text-gray-100">
                {unit.name.split(' ').at(-1)}
            </div>
            {unit.isOccupied && <div className="text-xs text-gray-300">
                Используется
            </div>}
        </li>
    );
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

interface ListOfUnitsProps {
    selectedUnit: Unit | null;
    setSelectedUnit: React.Dispatch<React.SetStateAction<Unit | null>>;
}

export const ListOfUnits: React.FC<ListOfUnitsProps> = memo(({
                                                                 selectedUnit,
                                                                 setSelectedUnit
                                                             }) => {
    const {myTeamColor, teams} = React.useContext(MapContext);
    const units = teams[myTeamColor].units;

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