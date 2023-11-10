import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {TeamColorType} from "@pages/GamePage/classes/teams.ts";

import AsimovPortrait from '@assets/portrets/Asimov.png';
import DokuchaevPortrait from '@assets/portrets/Dokuchaev.png';
import GagarinPortrait from '@assets/portrets/Gagarin.png';
import IsakovskiPortrait from '@assets/portrets/Isakovski.png';
import KonPortrait from '@assets/portrets/Kon.png';
import NikulinPortrait from '@assets/portrets/Nikulin.png';
import PrjevalskiPortrait from '@assets/portrets/Prjevalski.png';
import RylenkovPortrait from '@assets/portrets/Rylenkov.png';
import TenishevaPortrait from '@assets/portrets/Tenisheva.png';
import VasilevPortrait from '@assets/portrets/Vasilev.png';

export type UnitRoleType =
    'traveler'
    | 'scientist'
    | 'astronaut'
    | 'architect'
    | 'actor'
    | 'poet'
    | 'philanthropist'
    | 'soil_scientist'
    | 'writer'
    | 'scientist-writer';

interface IUnit {
    id: number;
    team?: TeamColorType | null;
    name: string;
    description: string;
    image: string;
    isOccupied: boolean;

    role: UnitRoleType;
    scoreMultiplier: { [key: string]: number }
    bonusDescription: string;
    moreAbout: string;
}

export class Unit implements IUnit {

    public id: number;
    public team: TeamColorType | null = null;
    public name: string;
    public description: string;
    public image: string;

    public role: UnitRoleType;
    public scoreMultiplier: { [key: string]: number } = {
        city: 1,
        field1: 1,
        field2: 1,
        road1: 1,
        road2: 1,
        road3: 1,
        road4: 1
    };
    public bonusDescription: string;
    public moreAbout: string;

    public isOccupied: boolean;

    constructor(unitData: IUnit) {
        if (unitData.team) this.team = unitData.team

        this.id = unitData.id;
        this.name = unitData.name;
        this.description = unitData.description;
        this.image = unitData.image;

        this.role = unitData.role;
        this.scoreMultiplier = {...this.scoreMultiplier, ...unitData.scoreMultiplier}; // Rewrite default values
        this.bonusDescription = unitData.bonusDescription;
        this.moreAbout = unitData.moreAbout;

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

// 'traveler' | 'scientist' | 'astronaut' | 'architect' | 'actor' | 'poet' | 'philanthropist' | 'soil_scientist';
    public getRole() {
        switch (this.role) {
            case 'traveler':
                return 'Путешественник';
            case 'scientist':
                return 'Учёный';
            case 'astronaut':
                return 'Космонавт';
            case 'architect':
                return 'Зодчий';
            case 'actor':
                return 'Актёр';
            case 'poet':
                return 'Поэт';
            case 'philanthropist':
                return 'Меценатка';
            case 'soil_scientist':
                return 'Почвовед';
            case 'writer':
                return 'Писатель';
            case 'scientist-writer':
                return 'Писатель-фантаст';
            default:
                return '';
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
                if (borderName == 'road' && mapTile.roadEnd) break;

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
        if (borderName == 'road' && lastTile.roadEnd) return count === 0;

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
const Asimov = new Unit({
    id: 0,
    name: 'Айзек Азимов Юдович',
    description: 'Айзек Азимов - писатель-фантаст, популяризатор науки, биохимик. Автор трёх законов робототехники. Написал около 500 произведений, в основном художественных и научно-популярных. Родился в Смоленской губернии (ныне Смоленская область)',
    image: AsimovPortrait,
    isOccupied: false,
    role: 'scientist-writer',
    scoreMultiplier: {city: 1.5, road1: 1.5, road2: 1.5, road3: 1.5, road4: 1.5},
    bonusDescription: 'Айзек Азимов принесет вам 3 очка вместо 2 в городе, и 1.5 очка на клетках дороги',
    moreAbout: 'https://ru.wikipedia.org/wiki/Азимов,_Айзек'
});

const Dokuchaev = new Unit({
    id: 1,
    name: 'Василий Васильевич Докучаев',
    description: 'Васи́лий Васи́льевич Докуча́ев — русский геолог и почвовед, профессор минералогии и кристаллографии Санкт-Петербургского университета, директор Ново-Александрийского института сельского хозяйства и лесоводства. Известен как основоположник школы научного почвоведения и географии почв.',
    image: DokuchaevPortrait,
    isOccupied: false,
    role: 'soil_scientist',
    scoreMultiplier: {field1: 3, field2: 3},
    bonusDescription: 'Поставив геолога Докучаева на зелёную зону, вы получите втрое больше очков',
    moreAbout: 'https://ru.wikipedia.org/wiki/Докучаев,_Василий_Васильевич'
});

const Gagarin = new Unit({
    id: 2,
    name: 'Юрий Алексеевич Гагарин',
    description: 'Ю́рий Алексе́евич Гага́рин — лётчик-космонавт СССР, Герой Советского Союза. Юрий Гагарин стал первым человеком в мировой истории, совершившим полёт в космическое пространство',
    image: GagarinPortrait,
    isOccupied: false,
    role: 'astronaut',
    scoreMultiplier: {city: 2, field1: 2, field2: 2, road1: 2, road2: 2, road3: 2, road4: 2},
    bonusDescription: 'Юрий Гагарин дает 2х бонус очков, куда бы вы его не поставили',
    moreAbout: 'https://ru.wikipedia.org/wiki/Гагарин,_Юрий_Алексеевич'
});

const Isakovski = new Unit({
    id: 3,
    name: 'Михаил Васильевич Исаковский',
    description: 'Русский советский поэт, поэт-песенник, прозаик, переводчик. Герой Социалистического Труда (1970). Лауреат двух Сталинских премий первой степени',
    image: IsakovskiPortrait,
    isOccupied: false,
    role: 'writer',
    scoreMultiplier: {road1: 2, road2: 2, road3: 2, road4: 2},
    bonusDescription: 'Получите в 2 раза больше очков, поставив поэта Исаковского на ваши дороги',
    moreAbout: 'https://ru.wikipedia.org/wiki/Исаковский,_Михаил_Васильевич'
});

const Kon = new Unit({
    id: 4,
    name: 'Фёдор Савельевич Конь',
    description: 'Фёдор Конь - один из немногих древнерусских зодчих, чьё имя зафиксировано источниками. Одной из первых и самых значимых его построек являются стены Белого города в Москве. Крупнейшая из сохранившихся кирпичных крепостей мира - Cмоленская крепостная стена, была построенна как раз под руководством Фёдора Коня',
    image: KonPortrait,
    isOccupied: false,
    role: 'architect',
    scoreMultiplier: {city: 2},
    bonusDescription: 'Получите вдвое больше очков за город, окруженный Cмоленская крепостная стеной, построенной под руководством Фёдора Коня!',
    moreAbout: 'https://ru.wikipedia.org/wiki/Конь,_Фёдор_Савельевич'
});

const Nikulin = new Unit({
    id: 5,
    name: 'Ю́рий Влади́мирович Нику́лин',
    description: 'Советский и российский артист цирка (клоун), цирковой режиссёр, киноактёр, телеведущий. Герой Социалистического Труда (1990), народный артист СССР (1973), лауреат Государственной премии РСФСР им. братьев Васильевых (1980), кавалер двух орденов Ленина (1980, 1990). Участник Великой Отечественной войны.',
    image: NikulinPortrait,
    isOccupied: false,
    role: 'actor',
    scoreMultiplier: {road1: 2, road2: 2, road3: 2, road4: 2},
    bonusDescription: 'Поставте Юрия Никулина на дорогу, чтобы получить вдвое больше очков',
    moreAbout: 'https://ru.wikipedia.org/wiki/Никулин,_Юрий_Владимирович'
});

const Prjevalski = new Unit({
    id: 6,
    name: 'Никола́й Миха́йлович Пржева́льский',
    description: 'Никола́й Миха́йлович Пржева́льский - русский путешественник (поляк по происхождению), географ и натуралист, почётный член Императорского Русского географического общества. Генерального штаба генерал-майор (1886). Предпринял несколько экспедиций в Центральную Азию, во время которых изучил территорию Монголии, Северного Китая и Тибета.',
    image: PrjevalskiPortrait,
    isOccupied: false,
    role: 'traveler',
    scoreMultiplier: {road1: 2, road2: 2, road3: 2, road4: 2},
    bonusDescription: 'Русский путешественник Никола́й Пржева́льский удваивает очки на дорогах',
    moreAbout: 'https://ru.wikipedia.org/wiki/Пржевальский,_Николай_Михайлович'
});

const Rylenkov = new Unit({
    id: 7,
    name: 'Никола́й Ива́нович Рылéнков',
    description: 'Никола́й Ива́нович Рылéнков — русский советский поэт. Автор стихотворного пересказа «Слова о полку Игореве». Издал сборник статей «Традиции и новаторство»',
    image: RylenkovPortrait,
    isOccupied: false,
    role: 'poet',
    scoreMultiplier: {field1: 2, field2: 2},
    bonusDescription: 'Никола́й Рылéнков говорит: "Получи 2х очков на полях!" ',
    moreAbout: 'https://ru.wikipedia.org/wiki/Рыленков,_Николай_Иванович'
});

const Tenisheva = new Unit({
    id: 8,
    name: 'Мари́я Кла́вдиевна Те́нишева',
    description: 'Княгиня Мари́я Кла́вдиевна Те́нишева - русская дворянка, общественная деятельница, художница-эмальерка, преподавательница, меценатка и коллекционерка. Основательница художественной студии в Петербурге, Рисовальной школы и Музея русской старины в Смоленске, ремесленного училища в Бежице, а также художественно-промышленных мастерских в собственном имении Талашкино.',
    image: TenishevaPortrait,
    isOccupied: false,
    role: 'philanthropist',
    scoreMultiplier: {city: 2, field1: 2, field2: 2, road1: 2, road2: 2, road3: 2, road4: 2},
    bonusDescription: 'Всем наука! Бонус 2х на картах любого типа от Марии Тенишевой!',
    moreAbout: 'https://ru.wikipedia.org/wiki/Тенишева,_Мария_Клавдиевна'
});

const Vasilev = new Unit({
    id: 9,
    name: 'Бори́с Льво́вич Васи́льев',
    description: 'Бори́с Льво́вич Васи́льев - русский советский писатель, сценарист. Лауреат Премии Президента Российской Федерации (2000), Государственной премии СССР (1975) и премии Ленинского комсомола (1975). Участник Великой Отечественной войны. Член Союза писателей Москвы и Союза кинематографистов России, академик Российской академии кинематографических искусств «Ника»',
    image: VasilevPortrait,
    isOccupied: false,
    role: 'writer',
    scoreMultiplier: {field1: 2, field2: 2, road1: 2, road2: 2, road3: 2, road4: 2},
    bonusDescription: 'Дороги и поля - именно на этих клетках вы получаете бонус 2х благодаря Борису Васильеву',
    moreAbout: 'https://ru.wikipedia.org/wiki/Васильев,_Борис_Львович'
});



/* ----- Units definition ----- */

// Set of units
const listOfUnits = [
    Asimov,
    Dokuchaev,
    Gagarin,
    Isakovski,
    Kon,
    Nikulin,
    Prjevalski,
    Rylenkov,
    Tenisheva,
    Vasilev
];

/**
 * Get a list of units and set a team for every unit.
 * @param team
 */
export function getUnitsByTeam(team: TeamColorType) {
    return listOfUnits.map(unit => {
        const teamUnit = new Unit(unit);
        return teamUnit.setTeam(team);
    });
}

// Units divided by teams
export const units: { [key in TeamColorType]: Unit[] } = {
    blue: getUnitsByTeam('blue'),
    red: getUnitsByTeam('red'),
    green: getUnitsByTeam('green'),
    yellow: getUnitsByTeam('yellow'),
};