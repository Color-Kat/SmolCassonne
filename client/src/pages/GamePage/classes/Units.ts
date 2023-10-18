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
        const borderName = lastTile.borders[lastTile.getSideIndexWithRotation(position)];

        // Algorithm
        // We will count units on the map.
        // If it is more than 0, we can't place a unit on this border.
        // We need to count the units on all the same borders.
        // If it's a city at the top and a city at the bottom - check top and bottom tiles.

        let checkedIds: number[] = [];

        const countUnits = (tile: Tile, side: number) => {
            let result = 0;

            let mapSide = 0;
            if(side === 0) mapSide = 2;
            if(side === 1) mapSide = 3;
            if(side === 2) mapSide = 0;
            if(side === 3) mapSide = 1;

            console.log('map side:', mapSide);

            for (const mapTile of map) {
                // Skip the same tile
                if(mapTile.id === tile.id) continue;

                console.log('ids',mapTile.id, tile.id);

                // Skip already checked tiles
                if (checkedIds.includes(mapTile.id)) continue;
                checkedIds.push(mapTile.id); // Skip this tile the next iteration

                if(
                    mapTile.borders[mapTile.getSideIndexWithRotation(mapSide)] == borderName && // The same border
                    ((
                        (side === 0 || side === 2) &&                                               // Top and bottom
                        tile.coords.x === mapTile.coords.x &&                                       // Coords x the same
                        Math.abs(tile.coords.y - mapTile.coords.y) == tileSize                    // Delta y = tileSize -> it's neighbor
                    ) || (
                        (side === 1 || side === 3) &&                                               // Left and Right
                        tile.coords.y === mapTile.coords.y &&                                       // Coords y the same
                        Math.abs(tile.coords.x - mapTile.coords.x) == tileSize                    // Delta x = tileSize -> it's neighbor
                    ))
                ) {
                    console.log('connected: ', mapTile.id, mapTile.coords);

                    // This tile is connected to our tile
                    result += 1;

                    if(borderName == mapTile.borders[mapTile.getSideIndexWithRotation(mapSide + 1)])
                        result += countUnits(mapTile, mapSide + 1);
                    if(borderName == mapTile.borders[mapTile.getSideIndexWithRotation(mapSide + 2)])
                        result += countUnits(mapTile, mapSide + 2);
                    if(borderName == mapTile.borders[mapTile.getSideIndexWithRotation(mapSide + 3)])
                        result += countUnits(mapTile, mapSide + 3);
                }

            }

            // checkedIds = [];

            return result;
        }

        let result = 0;
        if(borderName == lastTile.borders[lastTile.getSideIndexWithRotation(position + 0)])
            result += countUnits(lastTile, position + 0);
        if(borderName == lastTile.borders[lastTile.getSideIndexWithRotation(position + 1)])
            result += countUnits(lastTile, position + 1);
        if(borderName == lastTile.borders[lastTile.getSideIndexWithRotation(position + 2)])
            result += countUnits(lastTile, position + 2);
        if(borderName == lastTile.borders[lastTile.getSideIndexWithRotation(position + 3)])
            result += countUnits(lastTile, position + 3);

        console.log(result);
        return result === 0;
    }

    public canBePlacedOnMap2(
        position: 0 | 1 | 2 | 3,
        map: Tile[],
        tileSize: number
    ): boolean {
        let lastTile: Tile = map.at(-1) as Tile;
        const checkedIds: number[] = [];

        // Return true if the neighbors
        const recursiveCheckTileForUnit = (currentTile: Tile, contactSide: 0 | 1 | 2 | 3): boolean => {
            const stack = [];

            for (const mapTile of map) {
                // Skip already checked tiles
                if (checkedIds.includes(mapTile.id)) continue;
                checkedIds.push(mapTile.id); // Skip this tile the next iteration

                // Skip current tile
                if (mapTile.id == currentTile.id) continue;

                // Skip tiles that is not a neighbor for the current tile
                if (
                    !mapTile.coords ||
                    !((
                            Math.abs(currentTile.coords.x - mapTile.coords.x) <= tileSize &&
                            Math.abs(currentTile.coords.y - mapTile.coords.y) == 0
                        ) ||
                        (
                            Math.abs(currentTile.coords.y - mapTile.coords.y) <= tileSize &&
                            Math.abs(currentTile.coords.x - mapTile.coords.x) == 0
                        ))
                ) continue;

                // Skip tiles that are the wrong neighbor for the current tile
                if (
                    (contactSide == 0 && currentTile.coords.y < mapTile.coords.y) ||
                    (contactSide == 1 && currentTile.coords.x < mapTile.coords.x) ||
                    (contactSide == 2 && currentTile.coords.y > mapTile.coords.y) ||
                    (contactSide == 3 && currentTile.coords.x > mapTile.coords.x)
                ) continue;

                // Get contact side index for neighbor tile
                let neighborContactSide = 0;
                if (contactSide == 0) neighborContactSide = 2;
                if (contactSide == 1) neighborContactSide = 3;
                if (contactSide == 2) neighborContactSide = 0;
                if (contactSide == 3) neighborContactSide = 1;

                // Take into account the rotation
                const tileBorderIndex = (4 - contactSide + currentTile.rotation) % 4;
                const mapTileBorderIndex = (4 - neighborContactSide + mapTile.rotation) % 4;

                // Get a name of the contracted sides
                const tileBorder = currentTile.borders[tileBorderIndex];
                const mapTileBorder = mapTile.borders[mapTileBorderIndex];

                // Skip tiles that are not with the same sides
                if(tileBorder != mapTileBorder) continue;

                // The contact side contains a unit! We can't place unit here!
                if(mapTile.units[neighborContactSide]) return true;

                // Here the contact sides are the same, and we need to check other neighbors for unit

                // Map tile is the end of the road
                if(tileBorder === 'road' && mapTile.roadEnd) return false;

                const nextPosition = (rotation: number): any => (4 - neighborContactSide + mapTile.rotation + rotation) % 4;

                console.log(neighborContactSide, nextPosition(0), nextPosition(1), nextPosition(2), nextPosition(3));

                // Now we need to find all contact sides for the map tile and check them
                // If the next position for check is the same
                if(tileBorder == mapTile.borders[nextPosition(0)])
                    stack.push(recursiveCheckTileForUnit(mapTile, nextPosition(0))); // This side contacts with current contact side
                if(tileBorder == mapTile.borders[nextPosition(1)])
                    stack.push(recursiveCheckTileForUnit(mapTile, nextPosition(1)));
                if(tileBorder == mapTile.borders[nextPosition(2)])
                    stack.push(recursiveCheckTileForUnit(mapTile, nextPosition(2))); //
                if(tileBorder == mapTile.borders[nextPosition(3)])
                    stack.push(recursiveCheckTileForUnit(mapTile, nextPosition(3))); //



                // If the contact sides are the same
                // if (tileBorder !== mapTileBorder) return true;
                //
                // if (mapTileBorder == 'road' && mapTile.roadEnd)
                // TODO contactSide

            }

            // If at least one tile in the stack is true, then return true, else return false
            return stack.some(item => item == true);
        }

        const nextPosition = (rotation: number): any => (4 - position + lastTile!.rotation + rotation) % 4;
        const tileBorder = lastTile!.borders[(4 - position + lastTile!.rotation) % 4];

        const stack = [];

        if(tileBorder == lastTile!.borders[nextPosition(0)])
            stack.push(recursiveCheckTileForUnit(lastTile, nextPosition(0))); // This side contacts with current contact side
        if(tileBorder == lastTile!.borders[nextPosition(1)])
            stack.push(recursiveCheckTileForUnit(lastTile, nextPosition(1)));
        if(tileBorder == lastTile!.borders[nextPosition(2)])
            stack.push(recursiveCheckTileForUnit(lastTile, nextPosition(2))); //
        if(tileBorder == lastTile!.borders[nextPosition(3)])
            stack.push(recursiveCheckTileForUnit(lastTile, nextPosition(3))); //

        return !stack.some(item => item == true);
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
