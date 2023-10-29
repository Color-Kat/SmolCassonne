import {Unit, units as listOfUnits} from "@pages/GamePage/classes/Units.ts";

export type TeamColorType = 'blue' | 'red';

export class Team {
    public color: string;
    public name: string;
    public units: Unit[];
    public score: number;

    constructor(team: TeamColorType) {
        this.color = team;
        this.name = 'Игрок'
        this.units = listOfUnits[team];
        this.score = 0;
    }

    /**
     * Set name of player.
     * @param name
     */
    public setName(name: string) {
        this.name = name;
    }

    /**
     * Set a new score for this team.
     * @param score
     */
    public setScore(score: number) {
        this.score = score;
    }

    /**
     * Set a new units list for this team.
     * @param units
     */
    public setUnits(units: Unit[]) {
        this.units = units;
    }

    /**
     * Return HEX color of the team
     */
    public getTeamColor() {
        return {
            red: '#f43f5e',
            green: '#22c55e',
            blue: '#0ea5e9',
        }[this.color] ?? 'magenta';
    }
}

// List of available team colors
const teamColors: TeamColorType[] = ['red', 'blue'];

// List of teams
export const defaultTeams: {[key in TeamColorType]: Team} = {} as any;

for (const teamColor of teamColors) {
    defaultTeams[teamColor] = new Team(teamColor);
}
