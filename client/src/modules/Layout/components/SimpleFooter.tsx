import React, {memo} from 'react';
import {Logo} from "@UI/Elements/Logo/Logo.tsx";
import {currentYear} from "@/utils/date/dates.ts";

export const SimpleFooter: React.FC = memo(() => {
    const navigation = [
        {
            link: '',
            title: 'О нас'
        },
        {
            link: '',
            title: 'Наша команда'
        },
        {
            link: '',
            title: 'Условия'
        },
        {
            link: '',
            title: 'Политика'
        },
        {
            link: '',
            title: 'Поддержка'
        },
    ];

    return (
        <footer className="text-gray-500 bg-white px-4 py-5 w-screen md:px-8">
            {/* Text */}
            <div className="max-w-xl sm:mx-auto sm:text-center">
                <Logo className="h-16" />
                <p className="leading-relaxed mt-2 text-[15px]">
                    Это вариант футера для небольших проектов, где всего несколько страниц.
                    Также в шаблоне есть другой футер для более крупных приложений.
                </p>
            </div>

            {/* Links */}
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                {
                    navigation.map((item, i) => (
                        <li className="hover:text-gray-800" key={i}>
                            <a href={item.link}>
                                {item.title}
                            </a>
                        </li>
                    ))
                }
            </ul>

            {/* Rights, made by */}
            <div className="mt-8 items-center justify-between sm:flex">
                <div className="sm:mt-0 w-full flex justify-between md:items-end md:flex-row flex-col-reverse">
                    <div className="mt-4">&copy; {currentYear} Color template All rights reserved.</div>

                    <div className="flex flex-col">
                        <div>
                            Made by <a href="https://vk.com/color_kat" target="_blank" className="underline">
                                @ColorKat
                            </a>.
                        </div>
                        <div>
                            Powered by <a href="https://colorbit.ru" target="_blank" className="underline">
                                Colorbit.ru
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
});