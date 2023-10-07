import React, {memo} from 'react';
import {Link} from "react-router-dom";

interface CTASectionProps {

}

// https://floatui.com/components/cta-sections
export const CTASection: React.FC<CTASectionProps> = memo(({}) => {
    return (
        <section className="pb-8 pt-32">
            <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                <div className="max-w-xl md:mx-auto">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        <span className="">Экономьте ваше время</span> <br/>
                        для великих дел
                    </h3>

                    <p className="mt-3 text-gray-600">
                        Начните разработку нового приложение с готового шаблона,
                        и не превращайте написание кода в рутину.
                    </p>
                </div>
                <div className="flex gap-3 items-center mt-4 md:justify-center">
                    <a href="https://github.com/Color-Kat/laravel-react-ts-template" className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none">
                        Начать
                    </a>
                    <Link to="/test" className="inline-block py-2 px-4 text-gray-800 font-medium duration-150 border hover:bg-gray-50 active:bg-gray-100 rounded-lg">
                        Подробнее
                    </Link>
                </div>
            </div>
        </section>
    );
});