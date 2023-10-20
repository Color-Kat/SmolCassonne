import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";

interface IUnit {
    id: number;
    team?: string;
    name: string;
    description: string;
    image: string;
    occupied: boolean;
    role: 'traveler' | 'scientist';
}

export class Unit implements IUnit {

    public id: number;
    public team: string = '';
    public name: string;
    public description: string;
    public image: string;
    public occupied: boolean;
    public role: 'traveler' | 'scientist';

    constructor(unitData: IUnit) {
        this.id = unitData.id;
        this.name = unitData.name;
        this.description = unitData.description;
        this.image = unitData.image;
        this.occupied = unitData.occupied;
        this.role = unitData.role;
    }

    private isDebug = false;
    private debug(...args: any[]) {
        if(this.isDebug)
            console.log(...args);
    }

    private getSideName (side: 0 | 1 | 2 | 3) {
        return {
            0: 't',
            1: 'r',
            2: 'b',
            3: 'l',
        }[side];
    }

    public setTeam(team: string) {
        this.team = team;
        return this;
    }

    public getRole() {
        switch (this.role) {
            case 'traveler':
                return 'Путешественник';
            case 'scientist':
                return 'Учёный';
            default:
                return 'Поэт';
        }
    }

    public canBePlacedOnMap(
        position: 0 | 1 | 2 | 3,
        map: Tile[],
        tileSize: number
    ): boolean {

        console.log(map);

        // Get just placed tile
        let lastTile = map.at(-1) as Tile;

        // The border name where the unit was placed
        const borderName = lastTile.borders[position];

        // Algorithm
        // We will count units on the map.
        // If it is more than 0, we can't place a unit on this border.
        // We need to count the units on all the same borders.
        // If it's a city at the top and a city at the bottom - check top and bottom tiles.

        let checkedIds: number[] = [lastTile.id];

        const countUnits = (tile: Tile, side: number) => {
            this.debug('----------- countUnits -----------');
            let count = 0;

            // A unit stays on this tile side, increase count
            if(tile.units[side]) count += 1;

            // The map side is opposite to the tile side ][
            let mapSide: any = 0;
            if(side === 0) mapSide = 2;
            if(side === 1) mapSide = 3;
            if(side === 2) mapSide = 0;
            if(side === 3) mapSide = 1;

            // Iterate all map tiles and search for the neighbors that are connected by the same border
            for (const mapTile of map) {


                // TODO Проверка начинается с другой стороны тайла, если mapSide = этой стороне, и эта сторона подходит по объекту.


                let className = 'border-red-600 scale-90';

                // Skip already checked tiles
                if(checkedIds.includes(mapTile.id)) {
                    this.debug('Already checked', mapTile.borders);
                    continue; // Skip checked tiles
                }

                // Skip current tile
                if(tile.id == mapTile.id) {
                    this.debug('tile.id == mapTile.id');
                    continue; // Skip the same tile
                }

                // Skip tiles that are not connected to our border
                if(mapTile.borders[mapSide] != borderName) {
                    if(this.isDebug) mapTile.className = 'opacity-50';
                    this.debug('mapTile.borders[mapSide] != borderName');
                    continue; // Skip tiles that are not connected to our
                }

                // Skip tiles that are not corresponding to the current tile side
                // If we check the left side of the current tile,
                // then we need to check only one neighbor that is on the left side
                if(
                    (side == 0 && (mapTile.coords.x != tile.coords.x || mapTile.coords.y - tile.coords.y != -tileSize)) ||
                    (side == 2 && (mapTile.coords.x != tile.coords.x || mapTile.coords.y - tile.coords.y != tileSize) ) ||
                    (side == 1 && (mapTile.coords.x - tile.coords.x != tileSize ||mapTile.coords.y != tile.coords.y)) ||
                    (side == 3 && (mapTile.coords.x - tile.coords.x != -tileSize || mapTile.coords.y != tile.coords.y))
                ) {
                    if(this.isDebug) mapTile.className = 'opacity-50';
                    this.debug('It a right neighbor');
                    continue; // It a right neighbor
                }

                this.debug(mapTile.borders);

                // --- This tile is a right neighbor --- //

                // We have checked this tile
                checkedIds.push(mapTile.id);

                // Check if there is a unit on this side
                if(mapTile.units[mapSide]) count++;

                // Check for units on other sides of the neighbor that matches the border (check all cities, fields, etc)

                // Business logic for a field that cannot go through the tile center
                if(
                    borderName == 'field' &&
                    mapTile.borders[(mapSide + 1) % 4] != 'field' &&
                    mapTile.borders[(mapSide + 3) % 4] != 'field'
                ) continue;

                className += ` border-${this.getSideName(mapSide)}-8`;

                mapSide = (mapSide + 1) % 4
                if(borderName == mapTile.borders[mapSide]) {
                    className += ` border-${this.getSideName(mapSide)}-4`;
                    this.debug('go to ', mapSide);
                    count += countUnits(mapTile, mapSide); // Calculate units on this side
                }

                mapSide = (mapSide + 2) % 4;
                if(borderName == mapTile.borders[mapSide]){
                    className += ` border-${this.getSideName(mapSide)}-4`;
                    this.debug('go to ', mapSide);
                    count += countUnits(mapTile, mapSide);

                }

                mapSide = (mapSide + 3) % 4;
                if(borderName == mapTile.borders[mapSide]){
                    className += ` border-${this.getSideName(mapSide)}-4`;
                    this.debug('go to ', mapSide);
                    count += countUnits(mapTile, mapSide);
                }

                // For debug visualize algorithm
                if(this.isDebug) mapTile.className = className;
            }

            return count;
        }


        // Count units at the same borders on four sides
        let count = 0;
        if(borderName == lastTile.borders[position])
            count += countUnits(lastTile, position);

        // Business logic for a field that cannot go through the tile center
        if(
            borderName == 'field' &&
            lastTile.borders[(position + 1) % 4] != 'field' &&
            lastTile.borders[(position + 3) % 4] != 'field'
        ) {
            console.log('THIS TILE IS DOUBLE FIELD');
            return count === 0;
        }

        position = (position + 1) % 4 as any;
        if(borderName == lastTile.borders[position])
            count += countUnits(lastTile, position);

        position = (position + 2) % 4 as any;
        if(borderName == lastTile.borders[position])
            count += countUnits(lastTile, position);

        position = (position + 3) % 4 as any;
        if(borderName == lastTile.borders[position])
            count += countUnits(lastTile, position);

        this.debug('Units count: ' + count);
        return count === 0;
    }
}

const traveler = new Unit({
    id: 0,
    name: 'Николай Михайлович Пржевальский',
    description: 'Никола́й Миха́йлович Пржева́льский — русский путешественник, географ и натуралист, почётный член Русского географического общества. Предпринял несколько экспедиций в Центральную Азию, во время которых изучил территорию Монголии, Китая и Тибета. Генерал-майор. Брат адвоката Владимира и математика Евгения Пржевальских',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDDNnZ-mO6UTZ4jSDCWlQ27RbJVmjr67Jw-w1uWqhH3z5S61OoT8JSmjxO4E03U5HXbBA&usqp=CAU',
    occupied: false,
    role: 'traveler'
});

const scientist = new Unit({
    id: 1,
    name: 'Василий Васильевич Докучаев',
    description: 'Васи́лий Васи́льевич Докуча́ев — русский геолог и почвовед, профессор минералогии и кристаллографии Санкт-Петербургского университета, директор Ново-Александрийского института сельского хозяйства и лесоводства. Известен как основоположник школы научного почвоведения и географии почв.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Dokuchaev_1888.jpg/274px-Dokuchaev_1888.jpg',
    occupied: false,
    role: 'scientist'
});

const listOfUnits = [
    traveler,
    scientist
];

function getUnitsByTeam(team: string) {
    return listOfUnits.map(unit => {
        const teamUnit = new Unit(unit);
        return teamUnit.setTeam(team);
    });
}

export const units = {
    blue: getUnitsByTeam('blue'),
    red: getUnitsByTeam('red'),
};

console.log(units);
