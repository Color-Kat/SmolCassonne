import React, {memo} from "react";
import oldWoodBg from "@assets/textures/oldWood.png";
import {Team} from "@pages/GamePage/classes/teams.ts";
import {MapContext} from "@pages/GamePage/gameContext.ts";
import {UnitCard} from "@pages/GamePage/modules/Teams/components/UnitCard.tsx";

interface TeamCardProps {
    team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = memo(({team}) => {
    const {myTeamColor} = React.useContext(MapContext);

    return (
        <li
            className="flex justify-between gap-32 h-full rounded-b-xl shadow-lg p-2 pt-1 min-w-[250px] pointer-events-auto"
            style={{
                background: `url(${oldWoodBg})`,
                // backgroundRepeat: "repeat"
            }}
        >
            {/*<div>*/}
            {/*  avatar  */}
            {/*</div>*/}

            <div className="flex flex-col text-gray-100 w-full">
                <div
                    className="text-lg flex justify-between gap-3"
                >
                    <div>
                        <b style={{color: team.getTeamColor()}}>
                            {team.name}
                        </b>
                        <span className="text-sm text-gray-300">
                            {myTeamColor == team.color ? ' (Вы)' : null}
                        </span>
                    </div>

                    <div>{team.score} оч.</div>
                </div>
                <ul className="flex gap-1.5">
                    {team.units.map((unit) => (
                        <UnitCard key={unit.id} unit={unit}/>
                    ))}
                </ul>
            </div>
        </li>
    );
});