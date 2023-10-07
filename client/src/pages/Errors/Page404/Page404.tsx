import {BsArrowLeft} from "react-icons/bs";
import {useBack} from "@hooks/navigation.ts";

import illustration_404 from '../assets/404.png';
import {Helmet} from "react-helmet";
import React from "react";

export const Page404 = () => {
    const back = useBack();

    return (
        <div className="max-w-screen-xl h-full mx-auto px-4 flex items-center justify-start md:px-8">
            <Helmet>
                <title>Страница не найдена - 404</title>
                <link rel="canonical" href={import.meta.env.VITE_APP_URL + '/404'}/>
            </Helmet>

            <div
                className="max-w-lg mx-auto flex-1 flex-row-reverse gap-12 items-center justify-between md:max-w-none md:flex">
                <div className="flex-1 max-w-lg">
                    <img src={illustration_404}/>
                </div>
                <div className="mt-12 flex-1 max-w-lg space-y-3 md:mt-0">
                    <h3 className="text-indigo-600 font-semibold">
                        Ошибка 404
                    </h3>
                    <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
                        Страница не найдена
                    </p>
                    <p className="text-gray-600">
                        Извините, но такой страницы не существует.
                    </p>
                    <button
                        className="text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1"
                        onClick={back}
                    >
                        <BsArrowLeft/> Назад
                    </button>
                </div>
            </div>
        </div>
    )
}