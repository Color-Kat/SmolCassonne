import React, {memo} from "react";
import {FaAngleRight} from "react-icons/fa";
import {H1} from "@UI/Typography";
import {FilledArrowLink, TextArrowLink} from "@UI/Links";

import heroImage from '../assets/hero-screen.png';

// https://floatui.com/components/heroes
export const HeroSection: React.FC = memo(({}) => {
    return (
        <section className="">
            <div className="page-container md:pt-16 md:pb-10 sm:py-20 pt-8 pb-16 lg:gap-12 gap-6 text-gray-600 overflow-hidden md:flex">
                <div className="flex-none space-y-5 max-w-xl">
                    <a
                        href="https://colorbit.ru"
                        target="_blank"
                        className="inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white"
                    >
                        <span className="inline-block rounded-full px-3 py-1 bg-indigo-600 text-white">
                            Спонсор
                        </span>
                        <p className="flex items-center gap-1">
                            Colorbit.ru - симулятор майнинга
                            <FaAngleRight/>
                        </p>
                    </a>

                    <H1>
                        Разрабатывайте приложения легко
                    </H1>

                    <p>
                        Готовый шаблон сайта на стеке Ts, React, Tailwind, vite, PHP, Laravel <br/>
                        со всем необходимым, и даже больше, <br/> чтобы вы могли творить удивительные вещи!
                    </p>

                    <div className="flex items-center gap-x-3 sm:text-sm first-letter:capitalize">
                        <FilledArrowLink to="/test">
                            <span className="hidden sm:block">Смотреть</span> компоненты
                        </FilledArrowLink>

                        <TextArrowLink to="/">
                            А это для красоты
                        </TextArrowLink>
                    </div>
                </div>

                <div className="flex-1 hidden lg:flex items-center">
                    <img
                        src={heroImage}
                        className="w-full mx-auto md:w-10/12 lg:w-full"
                    />
                </div>
            </div>
        </section>
    );
});