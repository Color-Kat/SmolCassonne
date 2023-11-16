import {shuffle} from '@/utils/arrays';
import {Unit} from "@pages/GamePage/classes/Units.ts";
import React from "react";

import A1_Image from '@assets/images/A1_Image.jpg';
import B1_Image from '@assets/images/B1_Image.jpg';
import C1_Image from '@assets/images/C1_Image.jpg';
import H1_Image from '@assets/images/H1_Image.jpg';
import J1_Image from '@assets/images/J1_Image.jpg';
import K1_Image from '@assets/images/K1_Image.jpg';
import O1_Image from '@assets/images/O1_Image.jpg';
import S1_Image from '@assets/images/S1_Image.jpg';
import V1_Image from '@assets/images/V1_Image.jpg';

export type BorderType = 'city' | 'road' | 'field';

export interface ITile {
    id: number;
    design: string;
    pennant?: boolean;
    borders: BorderType[];
    // objects: {city: number, road: number}[];
    rotation: number;

    roadEnd: boolean;

    units: (Unit | null)[];
    coords: { x: number, y: number };

    name?: string | null;
    realPhoto?: string | null;
    description?: string | null;
    moreAbout?: string | null;
}

export interface IMapTile extends ITile {
    coords: {
        x: number;
        y: number;
    };
}

class TilesDeck {
    private deck: Partial<ITile>[] = ([

        /* --- New tiles 2 --- */
        {id: 0, design: "A-1", borders: ['field', 'field', 'road', 'field'], roadEnd: true,
        name: 'Церковь Петра и Павла', realPhoto: A1_Image,
        description: 'Церковь Петра и Павла XII века (годы постройки около 1146-го) находится в Смоленске на улице Кашена и представляет собой, пожалуй, один из лучших примеров преемственности древнерусского зодчества от византийских традиций.',
        moreAbout: 'http://www.visitsmolensk.ru/chto-posmotret/dostoprimechatelnosti/cerkvi/cerkov-petra-i-pavla/'},
        {id: 1, design: "B-1", borders: ['field', 'field', 'field', 'field'],
        name: 'Католический костел', realPhoto: B1_Image,
        description: 'Католическая община Смоленска ведет свою историю с середины XVII века, после возвращения Смоленщины в состав Московского государства из-под власти поляк и литовцев. Первый католический храм появился здесь в XVIII веке, а нынешний готический костел был возведен в конце XIX века. Он поражал своим внешним и внутренним убранством и вмещал до 6000 человек. К нему примыкало римско-католическое кладбище. На данный момент храм закрыт и нуждается в реставрации.',
        moreAbout: 'https://www.tripadvisor.ru/Attraction_Review-g672719-d6486970-Reviews-or10-Roman_Catholic_Church_Smolensk-Smolensk_Smolensky_District_Smolensk_Oblast_C.html'},
        {id: 2, design: "C-1", borders: ['city', 'city', 'city', 'city'],
        name: 'Успенский собор', realPhoto: C1_Image,
        description: 'Находится на Соборной горе в центре города. От стен собора открывается отличный вид на город. Успенский собор возведен на месте деревянной церкви XII века в 1677 году. Храм построен в стиле барокко. Он увенчан куполами синего цвета с позолоченными крестами. Интересен иконостас храма – он составляет в высоту 30 метров. В состав архитектурного ансамбля собора также входят колокольня, каретные корпуса и палаты.',
        moreAbout: 'https://www.tripadvisor.ru/Attraction_Review-g672719-d5521267-Reviews-Cathedral_of_the_Assumption_Uspensky_Sobor-Smolensk_Smolensky_District_Smolensk_O.html'},
        {id: 3, design: "D", borders: ['city', 'road', 'field', 'road']},
        {id: 3, design: "D", borders: ['city', 'road', 'field', 'road']},
        {id: 4, design: "E", borders: ['city', 'field', 'field', 'field']},
        {id: 4, design: "E", borders: ['city', 'field', 'field', 'field']},
        {id: 5, design: "F", borders: ['field', 'city', 'field', 'city'], pennant: true},
        {id: 6, design: "G", borders: ['field', 'city', 'field', 'city']},
        {id: 7, design: "H-1", borders: ['field', 'field', 'city', 'field'],
        name: "Кинотеатр «Октябрь»", realPhoto: H1_Image,
        description: 'В 1948 году открытие «Октября» символизировало возрождение послевоенного Смоленска. Это событие стало настоящим праздником, который приурочили к годовщине Октябрьской революции. «Около 25 тысяч трудящихся приняли участие в праздничной демонстрации в Смоленске. Это была демонстрация безграничной любви и преданности нашего народа коммунистической партии, советскому правительству, тому, кто ведет нашу Родину от победы к победе, – товарищу Сталину», – сообщала местная пресса. ',
        moreAbout: 'https://readovka67.ru/news/2097'},
        {id: 8, design: "I", borders: ['city', 'field', 'field', 'city']},
        {id: 9, design: "I", borders: ['city', 'field', 'field', 'city']},
        {id: 10, design: "J", borders: ['city', 'road', 'road', 'field']},
        {id: 11, design: "J-1", borders: ['city', 'road', 'road', 'field'],
        name: 'Колеса обозрения', realPhoto: J1_Image,
        description: 'Высота нового «Колеса обозрения» - 50 метров, оно входит в десятку самых высоких в центральной России. 18 кабинок, рассчитанные каждая на 6 мест, оснащены подогревом, что позволяет комфортно эксплуатировать аттракцион в любое время года. Продолжительность одного оборота колеса составляет 8 минут - этого времени достаточно, чтобы осмотреть виды города.',
        moreAbout: 'https://www.tourister.ru/world/europe/russia/city/smolensk/placeofinterest/41273'},
        {id: 12, design: "K", borders: ['city', 'field', 'road', 'road']},
        {id: 13, design: "K-1", borders: ['city', 'field', 'road', 'road'],
        name: 'Памятник Защитникам Смоленска 1812 Года', realPhoto: K1_Image,
        description: 'В облике памятника переплелись черты часовни, обелиска и православные мотивы. Он отлит на Александровском литейном заводе в Санкт-Петербурге, высота вместе с массивным основанием из трех ступеней — 26 м, общий вес — 30 тонн, внутри полый. Пирамиду венчает луковичная глава с крестом, отсылающая к мотивам храма.',
        moreAbout: 'https://www.tourister.ru/world/europe/russia/city/smolensk/placeofinterest/25622/responses/11864'},
        {id: 14, design: "L", borders: ['city', 'road', 'road', 'road']},
        {id: 15, design: "L", borders: ['city', 'road', 'road', 'road']},
        {id: 16, design: "M", borders: ['city', 'city', 'road', 'city'], pennant: true},
        {id: 17, design: "N", borders: ['city', 'city', 'road', 'city']},
        {id: 18, design: "N", borders: ['city', 'city', 'road', 'city']},
        {id: 19, design: "O", borders: ['city', 'field', 'field', 'city'], pennant: true},
        {id: 20, design: "O-1", borders: ['city', 'field', 'field', 'city'],
        name: 'Памятник «Благодарная Россия — Героям 1812 г.»', realPhoto: O1_Image,
        description: 'Одним из самых известных памятников Смоленска является мемориал «Благодарная Россия — Героям 1812 г.». Он установлен в центре города в сквере Памяти Героев.',
        moreAbout: 'https://www.tourister.ru/world/europe/russia/city/smolensk/placeofinterest/40002'},
        {id: 21, design: "P", borders: ['city', 'road', 'road', 'city']},
        {id: 22, design: "P", borders: ['city', 'road', 'road', 'city']},
        {id: 23, design: "R", borders: ['city', 'city', 'field', 'city']},
        {id: 24, design: "S", borders: ['city', 'city', 'field', 'city'], pennant: true},
        {id: 25, design: "S-1", borders: ['city', 'city', 'field', 'city'], pennant: true,
        name: 'Здание администрации Смоленской области', realPhoto: S1_Image,
        description: 'Здание администрации Смоленской области (годы постройки 1931-32) было возведено по проекту архитектора С.А. Ильинской, находится на главной площади Смоленска – площади Ленина. Оно является, по сути, главным зданием региона и одним из наиболее красивых и внушительных строений на всей Смоленщине.',
        moreAbout: 'http://www.visitsmolensk.ru/chto-posmotret/dostoprimechatelnosti/arhitektura/glavnye-arhitekturnye-sooruzheniya/166/'},
        {id: 26, design: "T", borders: ['road', 'field', 'road', 'field']},
        {id: 27, design: "T", borders: ['road', 'field', 'road', 'field']},
        {id: 28, design: "T", borders: ['road', 'field', 'road', 'field']},
        {id: 29, design: "V", borders: ['field', 'field', 'road', 'road']},
        {id: 30, design: "V", borders: ['field', 'field', 'road', 'road']},
        {id: 31, design: "V-1", borders: ['field', 'field', 'road', 'road'],
        name: 'Памятники самолетам', realPhoto: V1_Image,
        description: 'Всего в Смоленске установлено пять «крылатых монументов», настоящих самолетов разных классов: Як-18Т, истребители МиГ-17 и Миг-23, лайнер Як-42 и бомбардировщик Ту-16 - навечно застывших на постаментах',
        moreAbout: 'http://www.visitsmolensk.ru/chto-posmotret/dostoprimechatelnosti/pamyatniki/238/'},
        {id: 32, design: "W", borders: ['field', 'road', 'road', 'road']},
        {id: 33, design: "W", borders: ['field', 'road', 'road', 'road']},
        {id: 34, design: "W", borders: ['field', 'road', 'road', 'road']},
        {id: 35, design: "X", borders: ['road', 'road', 'road', 'road']},
        {id: 36, design: "X", borders: ['road', 'road', 'road', 'road']},

        /* --- New Tiles --- */
        // {id: 8, design: "D", borders: ['city', 'road', 'field', 'road'], rotation: 0},
        // {id: 9, design: "D", borders: ['city', 'road', 'field', 'road'], rotation: 0},
        // {id: 10, design: "D", borders: ['city', 'road', 'field', 'road'], rotation: 0},
        // {id: 11, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        // {id: 12, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        // {id: 13, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        // {id: 14, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        // {id: 15, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        // {id: 16, design: "F", borders: ['field', 'city', 'field', 'city'], pennant: true, rotation: 0},
        // {id: 17, design: "F", borders: ['field', 'city', 'field', 'city'], pennant: true, rotation: 0},
        // {id: 18, design: "G", borders: ['field', 'city', 'field', 'city'], rotation: 0},
        // {id: 18, design: "G", borders: ['field', 'city', 'field', 'city'], rotation: 0},
        // {id: 22, design: "I", borders: ['city', 'field', 'field', 'city'], rotation: 0},
        // {id: 23, design: "I", borders: ['city', 'field', 'field', 'city'], rotation: 0},
        // {id: 24, design: "J-1", borders: ['city', 'road', 'road', 'field'], rotation: 0},
        // {id: 25, design: "J", borders: ['city', 'road', 'road', 'field'], rotation: 0},
        // {id: 26, design: "J", borders: ['city', 'road', 'road', 'field'], rotation: 0},
        // {id: 33, design: "M", borders: ['city', 'field', 'field', 'city'], pennant: true, rotation: 0},
        // {id: 34, design: "M", borders: ['city', 'field', 'field', 'city'], pennant: true, rotation: 0},
        // {id: 40, design: "P", borders: ['city', 'road', 'road', 'city'], rotation: 0},
        // {id: 41, design: "P", borders: ['city', 'road', 'road', 'city'], rotation: 0},
        // {id: 42, design: "P", borders: ['city', 'road', 'road', 'city'], rotation: 0},
        // {id: 50, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 51, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 52, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 53, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 54, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 55, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 56, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 57, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 58, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 59, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 60, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 61, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 62, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 63, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 64, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 65, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 66, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 38, design: "O", borders: ['city', 'road', 'road', 'city'], pennant: true, rotation: 0},
        // {id: 39, design: "O", borders: ['city', 'road', 'road', 'city'], pennant: true, rotation: 0},


        // {id: 1, design: "A", borders: ['field', 'field', 'road', 'field'], rotation: 0, roadEnd: true},
        // {id: 2, design: "A", borders: ['field', 'field', 'road', 'field'], rotation: 0, roadEnd: true},
        // {id: 3, design: "B", borders: ['field', 'field', 'field', 'field'], rotation: 0},
        // {id: 4, design: "B", borders: ['field', 'field', 'field', 'field'], rotation: 0},
        // {id: 5, design: "B", borders: ['field', 'field', 'field', 'field'], rotation: 0},
        // {id: 6, design: "B", borders: ['field', 'field', 'field', 'field'], rotation: 0},
        // {id: 7, design: "C", borders: ['city', 'city', 'city', 'city'], pennant: true, rotation: 0},
        // {id: 8, design: "D", borders: ['city', 'road', 'field', 'road'], rotation: 0},
        // {id: 9, design: "D", borders: ['city', 'road', 'field', 'road'], rotation: 0},
        // {id: 10, design: "D", borders: ['city', 'road', 'field', 'road'], rotation: 0},
        // {id: 11, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        // {id: 12, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        // {id: 13, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        // {id: 14, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        // {id: 15, design: "E", borders: ['city', 'field', 'field', 'field'], rotation: 0},
        // {id: 16, design: "F", borders: ['field', 'city', 'field', 'city'], pennant: true, rotation: 0},
        // {id: 17, design: "F", borders: ['field', 'city', 'field', 'city'], pennant: true, rotation: 0},
        // {id: 18, design: "G", borders: ['field', 'city', 'field', 'city'], rotation: 0},
        // {id: 19, design: "H", borders: ['field', 'city', 'field', 'city',], rotation: 0},
        // {id: 20, design: "H", borders: ['field', 'city', 'field', 'city'], rotation: 0},
        // {id: 21, design: "H", borders: ['field', 'city', 'field', 'city'], rotation: 0},
        // {id: 22, design: "I", borders: ['city', 'field', 'field', 'city'], rotation: 0},
        // {id: 23, design: "I", borders: ['city', 'field', 'field', 'city'], rotation: 0},
        // {id: 24, design: "J", borders: ['city', 'road', 'road', 'field'], rotation: 0},
        // {id: 25, design: "J", borders: ['city', 'road', 'road', 'field'], rotation: 0},
        // {id: 26, design: "J", borders: ['city', 'road', 'road', 'field'], rotation: 0},
        // {id: 27, design: "K", borders: ['city', 'field', 'road', 'road'], rotation: 0},
        // {id: 28, design: "K", borders: ['city', 'field', 'road', 'road'], rotation: 0},
        // {id: 29, design: "K", borders: ['city', 'field', 'road', 'road'], rotation: 0},
        // {id: 30, design: "L", borders: ['city', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        // {id: 31, design: "L", borders: ['city', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        // {id: 32, design: "L", borders: ['city', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        // {id: 33, design: "M", borders: ['city', 'field', 'field', 'city'], pennant: true, rotation: 0},
        // {id: 34, design: "M", borders: ['city', 'field', 'field', 'city'], pennant: true, rotation: 0},
        // {id: 35, design: "N", borders: ['city', 'city', 'field', 'field'], rotation: 0},
        // {id: 36, design: "N", borders: ['city', 'city', 'field', 'field'], rotation: 0},
        // {id: 37, design: "N", borders: ['city', 'city', 'field', 'field'], rotation: 0},
        // {id: 38, design: "O", borders: ['city', 'road', 'road', 'city'], pennant: true, rotation: 0},
        // {id: 39, design: "O", borders: ['city', 'road', 'road', 'city'], pennant: true, rotation: 0},
        // {id: 40, design: "P", borders: ['city', 'road', 'road', 'city'], rotation: 0},
        // {id: 41, design: "P", borders: ['city', 'road', 'road', 'city'], rotation: 0},
        // {id: 42, design: "P", borders: ['city', 'road', 'road', 'city'], rotation: 0},
        // {id: 43, design: "Q", borders: ['city', 'city', 'field', 'city'], pennant: true, rotation: 0},
        // {id: 44, design: "R", borders: ['city', 'city', 'field', 'city'], rotation: 0},
        // {id: 45, design: "R", borders: ['city', 'city', 'field', 'city'], rotation: 0},
        // {id: 46, design: "R", borders: ['city', 'city', 'field', 'city'], rotation: 0},
        // {id: 47, design: "S", borders: ['city', 'city', 'road', 'city'], pennant: true, rotation: 0, roadEnd: true},
        // {id: 48, design: "S", borders: ['city', 'city', 'road', 'city'], pennant: true, rotation: 0, roadEnd: true},
        // {id: 49, design: "T", borders: ['city', 'city', 'road', 'city'], rotation: 0, roadEnd: true},
        // {id: 50, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 51, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 52, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 53, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 54, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 55, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 56, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 57, design: "U", borders: ['road', 'field', 'road', 'field'], rotation: 0},
        // {id: 58, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 59, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 60, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 61, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 62, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 63, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 64, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 65, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 66, design: "V", borders: ['field', 'field', 'road', 'road'], rotation: 0},
        // {id: 67, design: "W", borders: ['field', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        // {id: 68, design: "W", borders: ['field', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        // {id: 69, design: "W", borders: ['field', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        // {id: 70, design: "W", borders: ['field', 'road', 'road', 'road'], rotation: 0, roadEnd: true},
        // {id: 71, design: "X", borders: ['road', 'road', 'road', 'road'], rotation: 0, roadEnd: true}
    ] as ITile[]).map((tile) => (
        new Tile(tile)
    ));

    public getShuffledDeck() {
        return shuffle(this.deck).slice(0,5);
    }

    /**
     * Restore a list of Tiles instances from a simple array of tile objects.
     * @param deckTiles
     */
    static hydrate(deckTiles: ITile[]): Tile[] {
        const hydratedDeck = deckTiles.map(tile => (new Tile(tile)));
        return hydratedDeck;
    }
}

export class Tile implements ITile {
    public id: number;
    public design: string;                                          // Use for image
    public borders: BorderType[];                                   // 0 - top, 1 - right, 2 - bottom, 3 - left
    public rotation: number = 0;                                    //
    public units: (Unit | null)[] = [null, null, null, null];       // 0 - top, 1 - right, 2 - bottom, 3 - left
    public pennant: boolean;
    public roadEnd: boolean;
    public coords: { x: number, y: number };

    public name: string | null = 'Успенский собор';
    public description: string | null = 'Собо́р Успе́ния Пресвято́й Богоро́дицы — православный храм в Смоленске, кафедральный собор Смоленской митрополии Русской православной церкви. Находится в центральной части города на Соборной горе';
    public realPhoto: string | null = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/%D0%92%D0%B8%D0%B4_%D0%B2%D0%B5%D1%87%D0%B5%D1%80%D0%BE%D0%BC.jpg/1280px-%D0%92%D0%B8%D0%B4_%D0%B2%D0%B5%D1%87%D0%B5%D1%80%D0%BE%D0%BC.jpg';
    public moreAbout: string | null = null;

    public className: string = ''; // Manually used for debug

    private sidesCount = 4;

    constructor(tile: Tile | (Partial<ITile> & Omit<ITile, 'units' | 'rotation' | 'roadEnd'>)) {
        this.id = tile.id;
        this.design = tile.design;
        this.borders = tile.borders;
        this.pennant = tile.pennant ?? false;
        this.roadEnd = tile.roadEnd ?? false;
        this.coords = tile.coords ?? {x: -999, y: -999};

        this.name = tile.name ?? null;
        this.realPhoto = tile.realPhoto ?? null;
        this.description = tile.description ?? null;
        this.moreAbout = tile.moreAbout ?? null;

        // Default common values that doesn't depend on tile
        if (tile instanceof Tile) {
            this.rotation = tile.rotation ?? 0;
            this.units = tile.units ?? [null, null, null, null];
        } else {
            if(tile.rotation) this.rotate(tile.rotation ?? 0, false);
            this.units = tile.units?.map(unit => unit ? new Unit(unit) : null) ?? [null, null, null, null];
            // this.rotation = 0;
            // this.units = [null, null, null, null];
        }
    }

    /**
     * Move tile entities that are connected to borders.
     * When we rotate tile, we need to shift borders and units.
     * @param steps
     * @private
     */
    private shiftAll(steps: number) {
        const shiftAmount = steps % this.sidesCount;

        if (shiftAmount === 0) return;

        if (shiftAmount > 0) {
            // Shift right
            let removedElements = [];

            // Shift borders
            removedElements = this.borders.splice(-shiftAmount);
            this.borders.unshift(...removedElements);

            // Shift units
            removedElements = this.units.splice(-shiftAmount);
            this.units.unshift(...removedElements);
        } else {
            // Shift left
            let removedElements = [];

            // Shift borders
            removedElements = this.borders.splice(0, -shiftAmount);
            this.borders.push(...removedElements);

            // Shift units
            removedElements = this.units.splice(0, -shiftAmount);
            this.units.push(...removedElements);
        }
    }

    /**
     * Rotate the tile by rotateValue.
     * 0 - top, 1 - right, 2 - bottom, 3 - left
     * @param rotateValue
     * @param shift
     */
    public rotate(rotateValue: number, shift: boolean = true) {
        if (rotateValue < 0) rotateValue = 4 + rotateValue;
        this.rotation = Math.abs((this.rotation + rotateValue)) % 4;

        if(shift) this.shiftAll(rotateValue);

        return this;
    }

    public getImageUrl() {
        return `/newTiles/${this.design}.jpg`;
        return `/tiles/${this.design}.png`;
    }

    /**
     * Return a React component of image with rotated tile
     *
     * @param tileSize
     * @constructor
     */
    public Image(tileSize = 198) {
        return (
            <img
                className="rounded-md shadow-md"
                src={this.getImageUrl()}
                draggable="false"
                alt=""
                style={{
                    width: tileSize + 'px',
                    height: tileSize + 'px',
                    transform: `rotate(${90 * this.rotation}deg)`
                }}
            />
        );
    }

    public setUnit(unit: (Unit | null), position: 0 | 1 | 2 | 3) {
        this.units[position] = unit;

        return this;
    }

    public setCoords(x: number, y: number) {
        this.coords = {x, y};

        return this;
    }

    /**
     * Check if the tile can be placed on the map according to the rules.
     *
     * @param tileSize
     * @param map
     * @param setTooltip
     */
    public checkIfFit(
        tileSize: number,
        map: Tile[],
        setTooltip: React.Dispatch<React.SetStateAction<string>>,
    ) {
        if (!this.coords) return false;

        let neighborsCount = 0;

        for (const mapTile of map) {
            // Skip tiles that is not a neighbor for the tile
            if (
                !mapTile.coords ||
                !((
                        Math.abs(this.coords.x - mapTile.coords.x) <= tileSize &&
                        Math.abs(this.coords.y - mapTile.coords.y) == 0
                    ) ||
                    (
                        Math.abs(this.coords.y - mapTile.coords.y) <= tileSize &&
                        Math.abs(this.coords.x - mapTile.coords.x) == 0
                    ))
            ) continue;

            // This place is already occupied
            if (this.coords.y == mapTile.coords.y && this.coords.x == mapTile.coords.x) {
                setTooltip('Это место уже занято');
                return false;
            }

            // Increase count of neighbors
            neighborsCount++;

            // Get indexes of the tile and mapTile sides that is contacted
            let tileContactSide = 0; // 0 - top, 1 - right, 2 - bottom, 3 - left
            let mapTileContactSide = 0; // 0 - top, 1 - right, 2 - bottom, 3 - left

            if (this.coords.y < mapTile.coords.y) {
                tileContactSide = 2;
                mapTileContactSide = 0;
            }
            if (this.coords.y > mapTile.coords.y) {
                tileContactSide = 0;
                mapTileContactSide = 2;
            }
            if (this.coords.x > mapTile.coords.x) {
                tileContactSide = 3;
                mapTileContactSide = 1;
            }
            if (this.coords.x < mapTile.coords.x) {
                tileContactSide = 1;
                mapTileContactSide = 3;
            }

            // Get a name of the contracted sides
            const tileBorder = this.borders[tileContactSide];
            const mapTileBorder = mapTile.borders[mapTileContactSide];

            // We can't place the tile when at least one neighbor is not equal by the side
            if (tileBorder !== mapTileBorder) {
                setTooltip('Границы тайлов не совместимы. Найдите другое место для тайла');

                return false;
            }
        }

        // We can place tile only by other tiles
        if (neighborsCount > 0) return true;
        else {
            setTooltip('Вы можете ставить тайлы только рядом с другими тайлами');

            // We can't place the tile
            return false;
        }
    };

    /**
     * Return index of side at position (0, 1, 2, 3) with rotation.
     *
     * @param position
     */
    // public getSideIndexWithRotation(position: number) {
    //     return ( 4 + position) % 4;
    // }
}

export default TilesDeck;