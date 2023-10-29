import React, {memo, useCallback} from 'react';
import {Unit} from "@pages/GamePage/classes/Units.ts";

import oldWoodBg from "@assets/textures/oldWood.png";
import {twJoin} from "tailwind-merge";
import {MapContext} from "@pages/GamePage/gameContext.ts";
import {Team, TeamColorType} from "@pages/GamePage/classes/teams.ts";
import {TeamCard} from "@pages/GamePage/modules/Teams/components/TeamCard.tsx";

interface TeamsProps {
    teams: { [key in TeamColorType]: Team };
}

export const Teams: React.FC<TeamsProps> = memo(({
                                                     teams
                                                 }) => {
    // const myTeam = teams[myTeamColor];


    const handleUnitClick = useCallback(() => {

    }, []);

    return (
        <ul className="absolute top-0 left-0 right-0 w-full h-25 flex justify-end gap-8 px-6 z-10 pointer-events-none">
            {Object.keys(teams).map((teamColor, index) => {
                const team = teams[teamColor as TeamColorType];

                return (
                    <TeamCard team={team} key={team.color}/>
                );
            })}
        </ul>
    );
});