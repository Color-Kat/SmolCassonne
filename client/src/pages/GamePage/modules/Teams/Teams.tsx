import React, {memo, useCallback} from 'react';
import {Unit} from "@pages/GamePage/classes/Units.ts";

import oldWoodBg from "@assets/textures/oldWood.png";
import {twJoin} from "tailwind-merge";

interface TeamsProps {
    myTeam: string;
    teams: string[];
    units: {
        [key: string]: Unit[]
    };
    setUnitInformation: React.Dispatch<React.SetStateAction<Unit | null>>;
}

interface UnitProps {
    unit: Unit;
    setUnitInformation: React.Dispatch<React.SetStateAction<Unit | null>>;
}

const UnitCard: React.FC<UnitProps> = memo(({unit, setUnitInformation}) => {
    const handleUnitClick = useCallback(() => {
        setUnitInformation(unit);
    }, []);

    return (
        <li>
            <img
                src={unit.image}
                alt={unit.name}
                onClick={handleUnitClick}
                className={
                    twJoin(
                        "object-contain h-12 cursor-pointer rounded-lg",
                        unit.occupied && "opacity-50 border-2 border-red-400"
                    )
                }
            />
        </li>
    );
});

export const Teams: React.FC<TeamsProps> = memo(({
                                                     teams,
                                                     myTeam,
                                                     units,
                                                     setUnitInformation
                                                 }) => {
    const myName = 'Player-1';

    const handleUnitClick = useCallback(() => {

    }, []);

    return (
        <ul className="absolute top-0 left-0 right-0 w-full h-25 flex justify-end gap-8 px-6 z-10">
            {teams.map((team, index) => {
                const teamUnits = units[team];

                return (
                    <li
                        key={team}
                        className="flex justify-between gap-32 h-full rounded-b-xl shadow-lg p-3 pt-1 min-w-[250px]"
                        style={{
                            background: `url(${oldWoodBg})`,
                            // backgroundRepeat: "repeat"
                        }}
                    >
                        {/*<div>*/}
                        {/*  avatar  */}
                        {/*</div>*/}

                        <div className="flex flex-col text-gray-100">
                            <div className="text-lg">
                                <b>{myTeam}</b> - myName
                            </div>
                            <ul className="flex gap-1.5">
                                {teamUnits.map((unit) => (
                                    <UnitCard key={unit.id} unit={unit} setUnitInformation={setUnitInformation}/>
                                ))}
                            </ul>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
});