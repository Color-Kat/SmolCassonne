import React, {memo} from 'react';
import {Dialog} from "@headlessui/react";
import {Modal} from "@UI/Modals";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BsCardChecklist} from "react-icons/bs";

import rules1 from "@assets/rules/1.png";
import rules2 from "@assets/rules/2.png";
import rules3 from "@assets/rules/3.png";
import rules4 from "@assets/rules/4.png";
import rules5 from "@assets/rules/5.png";


interface GameRulesProps {

}

export const GameRules: React.FC<GameRulesProps> = memo(({}) => {

    return (
        <Modal
            // modalClassName={}
            buttonText=""
            ButtonComponent={({onClick}: any) => (
                <button
                    onClick={onClick}
                    className="flex gap-1 items-center"
                >

                    Правила
                    <BsCardChecklist />

                </button>
            )}
        >
            {(closeModal) => (
                <Slider {...{
                    // dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                }}>
                    <div className="w-max">
                        <img
                            src={rules1}
                            alt=""
                            className="w-[670px] object-contain"
                        />
                    </div>
                    <div className="w-max">
                        <img
                            src={rules2}
                            alt=""
                            className="w-[670px] object-contain"
                        />
                    </div>
                    <div className="w-max">
                        <img
                            src={rules3}
                            alt=""
                            className="w-[670px] object-contain"
                        />
                    </div>
                    <div className="w-max">
                        <img
                            src={rules4}
                            alt=""
                            className="w-[670px] object-contain"
                        />
                    </div>
                    <div className="w-max">
                        <img
                            src={rules5}
                            alt=""
                            className="w-[670px] object-contain"
                        />
                    </div>

                </Slider>
            )}
        </Modal>

    );
});