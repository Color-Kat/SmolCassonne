import {Unit, units as listOfUnits} from "@pages/GamePage/classes/Units.ts";

export type TeamColorType = 'blue' | 'red' | 'green' | 'yellow';

export type TeamsType = Partial<{[key in TeamColorType]: Team}>;

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
    static hydrateTeams(teams: Partial<{[key in TeamColorType]: ITeam}>): TeamsType {
        const hydratedTeams: TeamsType = {} as any;

        for (const teamColor in teams) {
            const teamObject = teams[teamColor as TeamColorType];
            if(teamObject) hydratedTeams[teamColor as TeamColorType] = Team.hydrate(teamObject);
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
            yellow: '#e6b737',
        }[this.color] ?? 'magenta';
    }
}

/**
 * Return a list of teams that match the teamColors.
 *
 * @param teamColors
 */
export const getTeamsByColors = (teamColors: TeamColorType[]): TeamsType => {
    const teams: TeamsType = {} as any;

    for (const teamColor of teamColors) {
        teams[teamColor] = new Team(teamColor);
    }

    return teams;
}

// Default list of teams
export const defaultTeams = {blue: new Team('blue')};

