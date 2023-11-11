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
        <section className="relative h-[calc(100vh-4rem)]">

            <div className="absolute top-0 left-0 w-screen h-full flex items-center justify-center bg-black/90 z-0">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover  top-0 left-0 opacity-30"
                    src={videoSrc}
                    autoPlay
                    muted
                    controls={false}
                />
            </div>

            <div
                className="relative page-container md:pt-16 md:pb-10 sm:py-20 pt-8 pb-16 lg:gap-12 gap-6 text-gray-600 overflow-hidden md:flex z-10"
            >
                <div className="flex-none">
                    <a
                        href="https://свойкод.рф"
                        target="_blank"
                        className="inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white"
                    >
                        <span className="inline-block rounded-full px-3 py-1 bg-indigo-600 text-white">
                            Smolathon
                        </span>
                        <p className="flex items-center gap-1 text-gray-200">
                            Организатор хакатона
                            <FaAngleRight/>
                        </p>
                    </a>

                    <h1 className="text-indigo-400 text-8xl font-extrabold mt-5 mb-3">
                        СмолКассон
                    </h1>
                    <h2 className="text-5xl text-gray-300 font-semibold tracking-wide w-full">
                        Узнавай Смоленск играя
                    </h2>

                    <div className="mt-16 mb-12 text-gray-300 text-2xl max-w-md" style={{
                        // @ts-ignore
                        textWrap: 'balance'
                    }}>
                        Это многопользовательская игра по мотивам известной настольной игры "Каркассон", но выполненная в стилистике Смоленска
                    </div>

                    <div className="flex items-center gap-x-12 sm:text-sm first-letter:capitalize">
                        <FilledArrowLink to="/game">
                            Играть
                        </FilledArrowLink>

                        <a
                            href="#features"
                            className="flex items-center text-xl justify-center gap-x-1 py-2 px-4 text-gray-200 hover:text-gray-100 font-medium duration-150 md:inline-flex"
                        >
                            Узнать больше
                            <FaAngleRight/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
});