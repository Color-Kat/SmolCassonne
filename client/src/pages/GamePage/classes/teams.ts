import {Unit, units as listOfUnits} from "@pages/GamePage/classes/Units.ts";

export type TeamColorType = 'blue' | 'red';

export type TeamsType = {[key in TeamColorType]: Team};

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
     * Restore Team instance from a simple object.
     * @param team
     */
    static hydrate(team: ITeam): Team {
        const newTeam = new Team();
        newTeam.color = team.color;
        newTeam.name = team.name;
        newTeam.units = team.units.map(unit => new Unit(unit));
        newTeam.score = team.score;

        return newTeam;
    }

    /**
     * Restore a full list Team instances from a simple object
     * @param teams
     */
    static hydrateTeams(teams: {[key in TeamColorType]: ITeam}): TeamsType {
        const hydratedTeams: TeamsType = {} as any;

        for (const teamColor in teams) {
            hydratedTeams[teamColor as TeamColorType] = Team.hydrate(teams[teamColor as TeamColorType]);
        }

        return hydratedTeams;
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
export const defaultTeams: TeamsType = {} as any;

for (const teamColor of teamColors) {
    defaultTeams[teamColor] = new Team(teamColor);
}
