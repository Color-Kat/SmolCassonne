import React, {memo} from "react";
import {Features} from "@UI/Features";
import {H3} from "@UI/Typography";
import {BsBrightnessHigh, BsHouse, BsLightningCharge, BsPeople, BsPerson, BsStackOverflow} from "react-icons/bs";
import {HiOutlineSquare3Stack3D} from "react-icons/hi2";
import {GiBrain, GiChessKing} from "react-icons/gi";
import {FaRegChessKnight} from "react-icons/fa6";

interface HeroSectionProps {

}

// https://floatui.com/components/feature-sections
export const FeaturesSection: React.FC<HeroSectionProps> = memo(({}) => {

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
            description: "На некоторых тайлах находятся достопримечательности Смоленска, которые вы можете изучить"
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
        <section className="mt-16 mb-20" id="features">
            <div className="page-container py- text-gray-60">
                <H3 className="mb-5 text-app-accent sm:text-2xl text-xl">Преимущества:</H3>

                <Features features={features} />
            </div>
        </section>
    );
});