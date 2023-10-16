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
            case 'traveler': return 'Путешественник';
            case 'scientist': return 'Учёный';
            default: return 'Поэт';
        }
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
