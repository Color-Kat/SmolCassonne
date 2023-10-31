import {Unit, units as listOfUnits} from "@pages/GamePage/classes/Units.ts";

export type TeamColorType = 'blue' | 'red';

interface ITeam {
    color: TeamColorType;
    name: string;
    units: Unit[];
    score: number;
}

export class Team implements ITeam{
    public color: TeamColorType;
    public name: string;
    public units: Unit[];
    public score: number;

    constructor(team?: TeamColorType) {
        if(!team) team = 'blue';

        this.color = team;
        this.name = 'Игрок'
        this.units = listOfUnits[team];
        this.score = 0;
    }

    public createTeamFromObject(team: ITeam) {
        this.color = team.color;
        this.name = team.name;
        this.units = team.units.map(unit => new Unit(unit));
        this.score = team.score;

        return this;
        // Object.assign(this, team);
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
