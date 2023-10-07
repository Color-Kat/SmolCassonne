import React, {memo, useRef, useState} from 'react';
import {BsDashLg, BsPlusLg} from "react-icons/bs";


interface FaqSectionProps {

}

const FaqsCard = ({faqsList}: {faqsList: {question: string, answer: string}}) => {

    const answerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [answerHeight, setAnswerHeight] = useState('0px');

    const handleOpenAnswer = () => {
        if(!answerRef.current) return;

        const answerElH = (answerRef.current.childNodes[0] as any).offsetHeight;
        setIsOpen(prev => !prev);
        setAnswerHeight(`${answerElH + 20}px`);
    };

    return (
        <div
            className="space-y-3 mt-5 overflow-hidden border-b"
        >
            <h4
                className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium"
                onClick={handleOpenAnswer}
            >
                {faqsList.question}
                {
                    isOpen
                        ? <BsDashLg className="h-7 w-7 text-gray-600 ml-2 shrink-0"/>
                        : <BsPlusLg className="h-7 w-7 text-gray-600 ml-2 shrink-0"/>

                }
            </h4>

            <div
                ref={answerRef}
                className="duration-300"
                style={isOpen ? {height: answerHeight} : {height: '0px'}}
            >
                <div>
                    <p className="text-gray-500">
                        {faqsList.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const FaqSection: React.FC<FaqSectionProps> = memo(({}) => {
    const faqsList = [
        {
            question: "Могу ли я поменять стили компонентов?",
            answer: "Конечно, суть этого ультимативного шаблона в том, что все компоненты находятся не в node_modules, а прямо в вашем приложении. И вы вольны менять как угодно, будто это ваши собственные компоненты! Вы можете переписывать логику, менять стили, делать новые компоненты и удалять ненужные."
        },
        {
            question: "Что делать, если в шаблоне нет нужной мне функции?",
            answer: "Мы постоянно развиваем наш шаблон и добавляем в него новые функции из других наших проектов. Если в шаблоне ещё нет нужного Вам компонента, то вы можете сделать pull request в наш github репозиторий."
        },
        {
            question: "Могу ли я использовать этот шаблон в коммерческих проектах?",
            answer: "Конечно! Причем бесплатно, но если у вас есть возможность, то вы можете мне задонатить."
        },
        {
            question: "Зачем здесь этот ненужный вопрос?",
            answer: "Пусть будет!"
        },
        {
            question: "Как отблагодарить разработчика?",
            answer: "Сбер - 2202 2053 4859 4620. Спасибо😘"
        }
    ];

    return (
        <section className="leading-relaxed max-w-screen-xl mt-32 mx-auto px-4 md:px-8">

            <div className="space-y-3 text-center">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    Часто задаваемые вопросы
                </h1>

                <p className="text-gray-600 max-w-lg mx-auto text-lg">
                    Нет решения вашей проблемы? Напишите <a href="https://vk.com/ColorKat"
                                                            className="underline font-semibold">разработчику</a>!
                </p>
            </div>

            <div className="mt-14 max-w-2xl mx-auto">
                {
                    faqsList.map((item, i) => (
                        <FaqsCard
                            key={i}
                            faqsList={item}
                        />
                    ))
                }
            </div>

        </section>
    );
});