import React, {memo, ReactNode} from "react";
import {NavLink} from "react-router-dom";
import {BorderRightLineEffect} from "@UI/Effects";
import {twJoin} from "tailwind-merge";

type HeaderLinkType = { children: ReactNode, link: string };

export const HeaderNavItem: React.FC<HeaderLinkType> = memo(({
                                                          children,
                                                          link
                                                      }) => {
    return (
        <NavLink to={link} className="">
            {({isActive}) => (
                <BorderRightLineEffect as="li" active={isActive}>
                    {children}
                </BorderRightLineEffect>
            )}
        </NavLink>
    );
});

export const MobileHeaderLink: React.FC<HeaderLinkType> = memo(({
                                                                    children,
                                                                    link
                                                                }) => {

    return (
        <NavLink end to={link} className={({isActive}) => twJoin(
            isActive ? "text-indigo-500" : "",
        )}>
            {children}
        </NavLink>
    );
});