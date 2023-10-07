import React, {Component, memo, ReactNode} from "react";
import {Menu} from "@headlessui/react";
import {twJoin} from "tailwind-merge";

export interface IDropdownItem {
    text?: ReactNode;
    Icon?: any;
    disabled?: boolean;
    onClick?: any;
    group?: number;

    Component?: any;
}

export const DropdownItem: React.FC<{ item: IDropdownItem }> = memo(({item}) => {
    return (
        <Menu.Item>
            {({active}) => {
                if (item.Component) return <item.Component />;

                return (
                    (
                        <button
                            className={twJoin(
                                active ? 'bg-app-primary text-white' : 'text-gray-800',
                                'group flex w-full items-center rounded-lg px-2 py-2 text-sm gap-2',
                                'disabled:text-gray-400'
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