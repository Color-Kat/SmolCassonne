import {BorderType, Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {Team, TeamColorType} from "@pages/GamePage/classes/teams.ts";

export type UnitRoleType = 'traveler' | 'scientist' | 'astronaut';

interface IUnit {
    id: number;
    team?: TeamColorType|null;
    name: string;
    description: string;
    image: string;
    isOccupied: boolean;

    role: UnitRoleType;
    scoreMultiplier: {[key: string]: number}
}

export class Unit implements IUnit {

    public id: number;
    public team: TeamColorType|null = null;
    public name: string;
    public description: string;
    public image: string;

    public role: UnitRoleType;
    public scoreMultiplier: {[key: string]: number} = {city: 1, field1: 1, field2: 1, road1: 1, road2: 1, road3: 1, road4: 1 };

    public isOccupied: boolean;

    constructor(unitData: IUnit) {
        if(unitData.team) this.team = unitData.team

        this.id = unitData.id;
        this.name = unitData.name;
        this.description = unitData.description;
        this.image = unitData.image;

        this.role = unitData.role;
        this.scoreMultiplier = {...this.scoreMultiplier, ...unitData.scoreMultiplier}; // Rewrite default values

        this.isOccupied = unitData.isOccupied;
    }

    private isDebug = false;

    private debug(...args: any[]) {
        if (this.isDebug)
            console.log(...args);
    }

    private getSideName(side: 0 | 1 | 2 | 3) {
        return {0: 't', 1: 'r', 2: 'b', 3: 'l'}[side];
    }

    public setTeam(team: TeamColorType) {
        this.team = team;
        return this;
    }

    public setOccupied(isOccupied: boolean) {
        this.isOccupied = isOccupied;
        return this;
    }

    public getRole() {
        switch (this.role) {
            case 'traveler':
                return 'Путешественник';
            case 'scientist':
                return 'Учёный';
            case 'astronaut':
                return 'Космонавт';
            default:
                return 'Поэт';
        }
    }

    /**
     * Return true if unit can be place on the last placed tile at `position` side.
     *
     * @param position
     * @param map
     * @param tileSize
     */
    public canBePlacedOnMap(
        position: 0 | 1 | 2 | 3,
        map: Tile[],
        tileSize: number
    ): boolean {
        // Algorithm
        // We will count units on the map.
        // If it is more than 0, we can't place a unit on this border.
        // We need to count the units on all the same borders.
        // If it's a city at the top and a city at the bottom - check top and bottom tiles.

        // Get just placed tile
        let lastTile = map.at(-1) as Tile;

        // The border name where the unit was placed
        const borderName = lastTile.borders[position];

        let checkedIds: number[] = [lastTile.id];

        const countUnits = (tile: Tile, side: number) => {
            this.debug('----------- countUnits -----------');
            let count = 0;

            // A unit stays on this tile side, increase count
            if (tile.units[side]) count += 1;

            // The map side is opposite to the tile side ][
            let mapSide: any = 0;
            if (side === 0) mapSide = 2;
            if (side === 1) mapSide = 3;
            if (side === 2) mapSide = 0;
            if (side === 3) mapSide = 1;

            // Iterate all map tiles and search for the neighbors that are connected by the same border
            for (const mapTile of map) {
                let className = 'border-red-600 scale-90';

                // Skip already checked tiles
                if (checkedIds.includes(mapTile.id)) {
                    this.debug('Already checked', mapTile.borders);
                    continue; // Skip checked tiles
                }

                // Skip current tile
                if (tile.id == mapTile.id) {
                    this.debug('tile.id == mapTile.id');
                    continue; // Skip the same tile
                }

                // Skip tiles that are not connected to our border
                if (mapTile.borders[mapSide] != borderName) {
                    if (this.isDebug) mapTile.className = 'opacity-50';
                    this.debug('mapTile.borders[mapSide] != borderName');
                    continue; // Skip tiles that are not connected to our
                }

                // Skip tiles that are not corresponding to the current tile side
                // If we check the left side of the current tile,
                // then we need to check only one neighbor that is on the left side
                if (
                    (side == 0 && (mapTile.coords.x != tile.coords.x || mapTile.coords.y - tile.coords.y != -tileSize)) ||
                    (side == 2 && (mapTile.coords.x != tile.coords.x || mapTile.coords.y - tile.coords.y != tileSize)) ||
                    (side == 1 && (mapTile.coords.x - tile.coords.x != tileSize || mapTile.coords.y != tile.coords.y)) ||
                    (side == 3 && (mapTile.coords.x - tile.coords.x != -tileSize || mapTile.coords.y != tile.coords.y))
                ) {
                    if (this.isDebug) mapTile.className = 'opacity-50';
                    this.debug('It is not a neighbor');
                    continue; // It is not a neighbor
                }

                this.debug(mapTile.borders);

                // --- This tile is a right neighbor --- //

                // We have checked this tile
                checkedIds.push(mapTile.id);

                // Check if there is a unit on this side
                if (mapTile.units[mapSide]) count++;

                // -------------------------------------- //
                // Check for units on other sides of the neighbor that matches the border (check all cities, fields, etc)
                // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

                // If it's a road end, stop checking because this road can't be connected to other roads.
                if(borderName == 'road' && mapTile.roadEnd) break;

                // Business logic for a field that cannot go through the tile center
                if (
                    borderName == 'field' &&
                    mapTile.borders[(mapSide + 1) % 4] != 'field' &&
                    mapTile.borders[(mapSide + 3) % 4] != 'field'
                ) continue;

                className += ` border-${this.getSideName(mapSide)}-8`;

                // Count units on other sides of the neighbor that matches the border
                for (let mapSideOffset = 1; mapSideOffset < 4; mapSideOffset++) {
                    mapSide = (mapSide + mapSideOffset) % 4;

                    if (borderName == mapTile.borders[mapSide]) {
                        className += ` border-${this.getSideName(mapSide)}-4`;
                        this.debug('go to ', mapSide);
                        count += countUnits(mapTile, mapSide);
                    }
                }

                // For debug visualize algorithm
                if (this.isDebug) mapTile.className = className;
            }

            return count;
        }

        // Count units at the same borders on four sides
        let count = 0;

        // Position + 0
        if (borderName == lastTile.borders[position])
            count += countUnits(lastTile, position);

        // If it's a road end, stop checking because this road can't be connected to other roads.
        if(borderName == 'road' && lastTile.roadEnd) return count === 0;

        // Business logic for a field that cannot go through the tile center
        if (
            borderName == 'field' &&
            lastTile.borders[(position + 1) % 4] != 'field' &&
            lastTile.borders[(position + 3) % 4] != 'field'
        ) {
            return count === 0;
        }

        // Position + 1
        position = (position + 1) % 4 as any;
        if (borderName == lastTile.borders[position])
            count += countUnits(lastTile, position);

        // Position + 2
        position = (position + 2) % 4 as any;
        if (borderName == lastTile.borders[position])
            count += countUnits(lastTile, position);

        // Position + 3
        position = (position + 3) % 4 as any;
        if (borderName == lastTile.borders[position])
            count += countUnits(lastTile, position);

        this.debug('Units count: ' + count);

        // If there is no units on this border type, we can place unit here - return true
        return count === 0;
    }
}

/* ----- Units definition ----- */
const traveler = new Unit({
    id: 0,
    name: 'Николай Михайлович Пржевальский',
    description: 'Никола́й Миха́йлович Пржева́льский — русский путешественник, географ и натуралист, почётный член Русского географического общества. Предпринял несколько экспедиций в Центральную Азию, во время которых изучил территорию Монголии, Китая и Тибета. Генерал-майор. Брат адвоката Владимира и математика Евгения Пржевальских',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDDNnZ-mO6UTZ4jSDCWlQ27RbJVmjr67Jw-w1uWqhH3z5S61OoT8JSmjxO4E03U5HXbBA&usqp=CAU',
    isOccupied: false,
    role: 'traveler',
    scoreMultiplier: {road1: 2, road2: 2, road3: 2, road4: 2}
});

const scientist = new Unit({
    id: 1,
    name: 'Василий Васильевич Докучаев',
    description: 'Васи́лий Васи́льевич Докуча́ев — русский геолог и почвовед, профессор минералогии и кристаллографии Санкт-Петербургского университета, директор Ново-Александрийского института сельского хозяйства и лесоводства. Известен как основоположник школы научного почвоведения и географии почв.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Dokuchaev_1888.jpg/274px-Dokuchaev_1888.jpg',
    isOccupied: false,
    role: 'scientist',
    scoreMultiplier: {field1: 2, field2: 2}
});

const astronaut = new Unit({
    id: 2,
    name: 'Юрий Алексеевич Гагарин',
    description: 'Ю́рий Алексе́евич Гага́рин — лётчик-космонавт СССР, Герой Советского Союза. Совершил первый полёт в космос',
    image: 'https://biblioclub.ru/services/fks.php?fks_action=get_file&fks_id=31762774&fks_flag=2',
    isOccupied: false,
    role: 'astronaut',
    scoreMultiplier: {'city': 2}
});
/* ----- Units definition ----- */

// Set of units
const listOfUnits = [
    traveler,
    scientist,
    astronaut
];

/**
 * Get a list of units and set a team for every unit.
 * @param team
 */
function getUnitsByTeam(team: TeamColorType) {
    return listOfUnits.map(unit => {
        const teamUnit = new Unit(unit);
        return teamUnit.setTeam(team);
    });
}

// Units divided by teams
export const units: {[key in TeamColorType]: Unit[]} = {
    blue: getUnitsByTeam('blue'),
    red: getUnitsByTeam('red'),
    green: getUnitsByTeam('green'),
    yellow: getUnitsByTeam('yellow'),
};