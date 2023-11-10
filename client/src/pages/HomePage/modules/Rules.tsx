import React, {memo} from "react";
import {Features} from "@UI/Features";
import {H3} from "@UI/Typography";
import {BsBrightnessHigh, BsHouse, BsLightningCharge, BsPeople, BsPerson, BsStackOverflow} from "react-icons/bs";
import {HiOutlineSquare3Stack3D} from "react-icons/hi2";
import {GiBrain, GiChessKing} from "react-icons/gi";
import {FaRegChessKnight} from "react-icons/fa6";
import {H2} from "@UI/Typography/H2.tsx";


export const Rules: React.FC<{}> = memo(({}) => {

    const features = [
        {
            Icon: GiBrain,
            title: "Изучение культуры",
            description: "Вы познакомитесь со многими достопримечательностями Смоленска и его известными личностями"
        },
        {
            Icon: BsPerson,
            title: "Одиночный режим",
            description: "Вы можете играть даже один, если в данный момент на сервере нет других игроков"
        },
        {
            Icon: BsHouse,
            title: "Достопримечательности",
            description: "На некоторых тайлах находятся достопримечательности Смоленска, которые вы можете "
        },
        {
            Icon: BsPeople,
            title: "Играйте вместе",
            description: "Соревнуйтесь с другими пользователями, играть в СмолКассон можно группой до 4-х человек!"
        },
        {
            Icon: FaRegChessKnight,
            title: "Фишки - Смоляне",
            description: "Вместо фишек - известные личности Смоленщины, которые дают различные бонусы"
        },
        {
            Icon: BsStackOverflow,
            title: "Стратегия",
            description: "Соберите колоду Смолян, которая подходит под ваш стиль игры"
        },
    ];

    return (
        <section className="mt-12" id="features">
            <div className="page-container py- text-gray-60">
                <H2 className="mb-5 text-app-accent text-3xl">Краткие правила:</H2>

                <div className="w-full text-left text-lg">
                    В «СмолКассоне» вам предстоит составлять карту Смоленска из квадратов с нарисованными на них
                    дорогами, крепостью и посадами. На эти квадраты, которые называются <b>тайлы</b>, вы будете ставить
                    фишки известных людей Смоленщины - <b>Смоляне</b>, чтобы впоследствии получить за них победные очки.
                    В ходе партии один из игроков может сильно вырваться вперёд, однако победа присуждается только по результатам финального подсчёта очков.
                </div>

                <ul className="grid gap-y-12 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                    <li className="space-y-3 text-center">
                        <div
                            className="w-12 h-12 mx-auto bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center"
                        >

                        </div>

                        <h4 className="text-lg text-gray-800 font-semibold">
                            Выбор Смолян
                        </h4>

                        <p>
                            На тайлах изображе
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    );
});