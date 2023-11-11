import React, {memo, useEffect, useRef} from "react";
import {FaAngleRight} from "react-icons/fa";
import {H1} from "@UI/Typography";
import {FilledArrowLink, TextArrowLink} from "@UI/Links";

import heroImage from '@assets/hero-screen.png';
import videoSrc from '@assets/gameplay.mp4';
import {Link} from "react-router-dom";
import {twMerge} from "tailwind-merge";

// https://floatui.com/components/heroes
export const HeroSection: React.FC = memo(({}) => {


    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            videoElement.loop = true;
            videoElement.play();
        }
    }, []);


    return (
        <section className="relative">

            {/*<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black">*/}
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover absolute top-0 left-0"
                    src={videoSrc}
                    autoPlay
                    muted
                    controls={false}
                />
            {/*</div>*/}



            <div
                className="page-container md:pt-16 md:pb-10 sm:py-20 pt-8 pb-16 lg:gap-12 gap-6 text-gray-600 overflow-hidden md:flex"
            >
                <div className="flex-none space-y-5 max-w-xl">
                    <a
                        href="https://свойкод.рф"
                        target="_blank"
                        className="inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white"
                    >
                        <span className="inline-block rounded-full px-3 py-1 bg-indigo-600 text-white">
                            Smolathon
                        </span>
                        <p className="flex items-center gap-1">
                            Организатор хакатона
                            <FaAngleRight/>
                        </p>
                    </a>

                    <H1>
                        Открой Смоленск в Новом Свете: <br/>
                    </H1>
                    <div className="text-xl">
                        Играй, Учись, Побеждай!
                    </div>

                    <p>
                        Готовый шаблон сайта на стеке Ts, React, Tailwind, vite, PHP, Laravel <br/>
                        со всем необходимым, и даже больше, <br/> чтобы вы могли творить удивительные вещи!
                    </p>

                    <div className="flex items-center gap-x-3 sm:text-sm first-letter:capitalize">
                        <FilledArrowLink to="/game">
                            Играть
                        </FilledArrowLink>

                        {/*<TextArrowLink to="/#features">*/}
                        {/*    Узнать больше*/}
                        {/*</TextArrowLink>*/}

                        <a
                            href="#features"
                            className="flex items-center justify-center gap-x-1 py-2 px-4 text-gray-700 hover:text-gray-900 font-medium duration-150 md:inline-flex"
                        >
                            Узнать больше
                            <FaAngleRight/>
                        </a>
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