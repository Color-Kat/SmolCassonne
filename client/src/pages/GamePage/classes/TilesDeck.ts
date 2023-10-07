import {shuffle} from '@/utils/arrays';

export interface ITile {
    id: number;
    design: string;
    borders: ('field' | 'road' | 'wall' | 'water' | 'city')[];
    neighbors: boolean[];
    pennant: boolean;
    rotation: number;
}

class TilesDeck {
    private deck: ITile[] = [
        { id: 1, design: "A", borders: ['field', 'field', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 2, design: "A", borders: ['field', 'field', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 3, design: "B", borders: ['field', 'field', 'field', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 4, design: "B", borders: ['field', 'field', 'field', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 5, design: "B", borders: ['field', 'field', 'field', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 6, design: "B", borders: ['field', 'field', 'field', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 7, design: "C", borders: ['city', 'city', 'city', 'city'], neighbors: [false, false, false, false], pennant: true, rotation: 1 },
        { id: 8, design: "D", borders: ['city', 'road', 'field', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 9, design: "D", borders: ['city', 'road', 'field', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 10, design: "D", borders: ['city', 'road', 'field', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 11, design: "E", borders: ['city', 'field', 'field', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 12, design: "E", borders: ['city', 'field', 'field', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 13, design: "E", borders: ['city', 'field', 'field', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 14, design: "E", borders: ['city', 'field', 'field', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 15, design: "E", borders: ['city', 'field', 'field', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 16, design: "F", borders: ['field', 'city', 'field', 'city'], neighbors: [false, false, false, false], pennant: true, rotation: 1 },
        { id: 17, design: "F", borders: ['field', 'city', 'field', 'city'], neighbors: [false, false, false, false], pennant: true, rotation: 1 },
        { id: 18, design: "G", borders: ['field', 'city', 'field', 'city'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 19, design: "H", borders: ['city', 'field', 'city', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 20, design: "H", borders: ['city', 'field', 'city', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 21, design: "H", borders: ['field', 'city', 'field', 'city'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 22, design: "I", borders: ['city', 'field', 'field', 'city'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 23, design: "I", borders: ['city', 'field', 'field', 'city'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 24, design: "J", borders: ['city', 'road', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 25, design: "J", borders: ['city', 'road', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 26, design: "J", borders: ['city', 'road', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 27, design: "K", borders: ['city', 'field', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 28, design: "K", borders: ['city', 'field', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 29, design: "K", borders: ['city', 'field', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 30, design: "L", borders: ['city', 'road', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 31, design: "L", borders: ['city', 'road', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 32, design: "L", borders: ['city', 'road', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 33, design: "M", borders: ['city', 'field', 'field', 'city'], neighbors: [false, false, false, false], pennant: true, rotation: 1 },
        { id: 34, design: "M", borders: ['city', 'field', 'field', 'city'], neighbors: [false, false, false, false], pennant: true, rotation: 1 },
        { id: 35, design: "N", borders: ['city', 'city', 'field', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 36, design: "N", borders: ['city', 'city', 'field', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 37, design: "N", borders: ['city', 'city', 'field', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 38, design: "O", borders: ['city', 'road', 'road', 'city'], neighbors: [false, false, false, false], pennant: true, rotation: 1 },
        { id: 39, design: "O", borders: ['city', 'road', 'road', 'city'], neighbors: [false, false, false, false], pennant: true, rotation: 1 },
        { id: 40, design: "P", borders: ['city', 'road', 'road', 'city'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 41, design: "P", borders: ['city', 'road', 'road', 'city'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 42, design: "P", borders: ['city', 'road', 'road', 'city'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 43, design: "Q", borders: ['city', 'city', 'field', 'city'], neighbors: [false, false, false, false], pennant: true, rotation: 1 },
        { id: 44, design: "R", borders: ['city', 'city', 'field', 'city'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 45, design: "R", borders: ['city', 'city', 'field', 'city'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 46, design: "R", borders: ['city', 'city', 'field', 'city'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 47, design: "S", borders: ['city', 'city', 'road', 'city'], neighbors: [false, false, false, false], pennant: true, rotation: 1 },
        { id: 48, design: "S", borders: ['city', 'city', 'road', 'city'], neighbors: [false, false, false, false], pennant: true, rotation: 1 },
        { id: 49, design: "T", borders: ['city', 'city', 'road', 'city'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 50, design: "U", borders: ['road', 'field', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 51, design: "U", borders: ['road', 'field', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 52, design: "U", borders: ['road', 'field', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 53, design: "U", borders: ['road', 'field', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 54, design: "U", borders: ['road', 'field', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 55, design: "U", borders: ['road', 'field', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 56, design: "U", borders: ['road', 'field', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 57, design: "U", borders: ['road', 'field', 'road', 'field'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 58, design: "V", borders: ['field', 'field', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 59, design: "V", borders: ['field', 'field', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 60, design: "V", borders: ['field', 'field', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 61, design: "V", borders: ['field', 'field', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 62, design: "V", borders: ['field', 'field', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 63, design: "V", borders: ['field', 'field', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 64, design: "V", borders: ['field', 'field', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 65, design: "V", borders: ['field', 'field', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 66, design: "V", borders: ['field', 'field', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 67, design: "W", borders: ['field', 'road', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 68, design: "W", borders: ['field', 'road', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 69, design: "W", borders: ['field', 'road', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 70, design: "W", borders: ['field', 'road', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 },
        { id: 71, design: "X", borders: ['road', 'road', 'road', 'road'], neighbors: [false, false, false, false], pennant: false, rotation: 1 }
    ];


    public getShuffledDeck() {
        return shuffle(this.deck);
    }
}

export default TilesDeck