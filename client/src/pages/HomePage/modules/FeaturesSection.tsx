import React, {memo} from "react";
import {Features} from "@UI/Features";
import {H3} from "@UI/Typography";
import {BsBrightnessHigh, BsLightningCharge, BsPeople, BsPerson, BsStackOverflow} from "react-icons/bs";
import {HiOutlineSquare3Stack3D} from "react-icons/hi2";

interface HeroSectionProps {

}

// https://floatui.com/components/feature-sections
export const FeaturesSection: React.FC<HeroSectionProps> = memo(({}) => {

    const features = [
        {
            Icon: BsLightningCharge,
            title: "Изучение культуры",
            description: "Вы познакомитесь со многими достопримечательностями Смоленска и его известными личностями"
        },
        {
            Icon: BsPerson,
            title: "Одиночный режим",
            description: "Вы можете играть даже один, если в данный момент на сервере нет других игроков"
        },
        {
            Icon: BsPeople,
            title: "Играйте вместе",
            description: "Играть в СмолКассон можно группой до 4-х человек"
        },
        {
            Icon:
                () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>,
            title: "Готовые утилиты",
            description: "Десятки полезных функций, которые обязательно Вам пригодятся: utils, hooks, traits, configs, packages, styles."
        },

        {
            Icon: BsBrightnessHigh,
            title: "Готовый и кастомизируемый UI",
            description: "Большой набор UI компонентов и модулей для быстрого создания страниц с возможностью стилизации."
        },
        {
            Icon: BsStackOverflow,
            title: "Удобный стек технологий",
            description: "Html, css, scss, js, ts, React, Redux toolkit, react-router-dom, tailwind, vite, PHP, Laravel, fortify, sanctum, etc."
        },
    ];

    return (
        <section className="" id="features">
            <div className="page-container py- text-gray-60">
                <H3 className="mb-5 text-app-accent sm:text-2xl text-xl">Преимущества:</H3>

                <Features features={features} />
            </div>
        </section>
    );
});