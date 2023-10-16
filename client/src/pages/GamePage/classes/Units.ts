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
        contactSide: 0 | 1 | 2 | 3,
        map: Tile[],
        tileSize: number
    ): boolean {
        let lastTile = map.at(-1);
        const checkedIds: number[] = [];

        // Return true if the neighbors
        const recursiveCheckTileForUnit = (currentTile: Tile): boolean => {
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

                // If the contact sides are the same, check mapTile for units
                stack.push(recursiveCheckTileForUnit(mapTile));

                // If the contact sides are the same
                // if (tileBorder !== mapTileBorder) return true;
                //
                // if (mapTileBorder == 'road' && mapTile.roadEnd)
            }

            // If at least one tile in the stack is true, then return true, else return false
            return stack.some(item => item == true);
        }

        return !recursiveCheckTileForUnit(lastTile as Tile);
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
