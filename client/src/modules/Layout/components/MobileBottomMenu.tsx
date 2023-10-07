import React, {memo, useEffect, useState} from 'react';
import {BsBox, BsChat, BsGear, BsHouseDoor, BsPerson} from "react-icons/bs";
import {twJoin} from "tailwind-merge";
import {Link, NavLink, useLocation} from "react-router-dom";

interface MobileBottomMenuProps {

}

export const MobileBottomMenu: React.FC<MobileBottomMenuProps> = memo(({}) => {
    const location = useLocation();

    const navigation = [
        {title: "Главная", link: '/', Icon: BsHouseDoor, offset: "translate-x-0"},
        {title: "Тест", link: '/test', Icon: BsBox, offset: "translate-x-16"},
        {title: "Сообщения", link: '/chat', Icon: BsChat, offset: "translate-x-32"},
        {title: "Настройки", link: '/settings', Icon: BsGear, offset: "translate-x-48"},
        {title: "Профиль", link: '/profile1', Icon: BsPerson, offset: "translate-x-64"},
    ];

    const [active, setActive] = useState<null|number>(null);

    useEffect(() => {
        const index = navigation.findIndex((item) => item.link == location.pathname);
        setActive(index !== -1 ? index : null);
    }, [location]);

    return (
        <div className="md:hidden">
            <div className="fixed bottom-0 h-[4.4rem] w-screen bg-app-dark"></div>
            <div className={twJoin(
                "max-h-[4.4rem] rounded-t-xl flex justify-center",
                "fixed bottom-0 left-1/2 -translate-x-1/2 xs:w-[calc(100vw-10px)] w-screen",
                "bg-white shadow-md",
            )}>
                <ul className="flex relative">
                    {/* Bubble */}
                    <span
                        className={twJoin(
                            "bg-indigo-500 border-4 border-app-dark",
                            "h-16 w-16 absolute -top-6",
                            "duration-500 rounded-full will-change-transform",
                            active !== null ? navigation[active].offset : 'hidden'
                        )}
                    >
                        {/* Rounded corner shadows */}
                        <span
                            className={twJoin(
                                "shadow-mobile-bottom-menu-1 shadow-app-dark bg-transparent",
                                "w-3.5 h-3.5 absolute top-5 -left-[18px] rounded-tr-[11px]",
                            )}
                        />

                        <span
                            className={twJoin(
                                "shadow-mobile-bottom-menu-2 shadow-app-dark bg-transparent",
                                "w-3.5 h-3.5 absolute top-5 -right-[18px] rounded-tl-[11px]",
                            )}
                        />
                    </span>

                    {navigation.map((item, i) => (
                        <li key={i} className="w-16">
                            <Link
                                to={item.link}
                                className="flex flex-col justify-center items-center text-center pt-6"
                                // onClick={() => setActive(i)}
                            >
                                <span
                                    className={twJoin(
                                        "text-xl mb-1 duration-500 pointer-events-none select-none z-[1]",
                                        i === active && "-mt-6 text-white"
                                    )}
                                >
                                    <item.Icon/>
                                </span>

                                <span
                                    className={twJoin(
                                        "text-xs will-change-transform pointer-events-none select-none",
                                        active === i
                                            ? "translate-y-4 duration-700 opacity-100"
                                            : "opacity-0 translate-y-10"
                                    )}
                                >
                                    {item.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});