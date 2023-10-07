import React, {Component, memo, ReactNode} from "react";
import {Menu} from "@headlessui/react";
import {twJoin, twMerge} from "tailwind-merge";

export interface IThreeDotMenuItem {
    text?: ReactNode;
    Component?: any;
    Icon?: any;

    group?: number;

    className?: string;
    disabled?: boolean;
    onClick?: any;
}

export const ThreeDotMenuItem: React.FC<{ item: IThreeDotMenuItem }> = memo(({item}) => {
    return (
        <Menu.Item>
            {({active}) => {
                if (item.Component) return <item.Component />;

                return (
                    (
                        <button
                            className={twMerge(
                                active ? 'bg-app-primary text-white' : 'text-gray-800',
                                'group flex w-full items-center rounded-lg px-2 py-2 text-sm gap-2 disabled:text-gray-400',
                                item.className
                            )}
                            onClick={item.onClick}
                            disabled={item.disabled}
                        >
                            {item.Icon && <item.Icon/>}

                            {item.text}
                        </button>
                    )
                );
            }}
        </Menu.Item>
    );
});