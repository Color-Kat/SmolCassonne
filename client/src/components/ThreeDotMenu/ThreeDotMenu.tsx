import React, {Fragment, ReactNode, useMemo} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {BsThreeDotsVertical} from "react-icons/bs";

import {twMerge} from "tailwind-merge";
import {IThreeDotMenuItem, ThreeDotMenuItem} from "@components/ThreeDotMenu/ThreeDotMenuItem.tsx";

interface ThreeDotMenuProps {
    header?: string;
    className?: string;
    buttonClassName?: string;
    containerClassName?: string;
    itemClassName?: string;
}

type MenuWithItemsProps = { items: IThreeDotMenuItem[] };

type MenuWithGroupsProps = { groups: IThreeDotMenuItem[][] };

/**
 * Component of dropdown menu.
 *
 * @param title dropdown button text
 * @param items list of items to be displayed (one group).
 * @param groups list of groups with items (displayed with division).
 * @param className className for parent of all dropdown (use for position button).
 * @param buttonClassName className for styling dropdown button.
 * @param containerClassName className for styling dropdown container of items.
 * @constructor
 */
export const ThreeDotMenu: React.FC<
    (MenuWithItemsProps | MenuWithGroupsProps) & ThreeDotMenuProps
> = ({
         header = '',
         className,
         buttonClassName,
         containerClassName,
         ...props
     }) => {

    // Make one group from non-grouped items list
    const groups: IThreeDotMenuItem[][] = useMemo(() => {
        if ('groups' in props) return props.groups;
        else return [props.items] as any;
    }, []);

    return (
        <Menu as="div" className={twMerge("relative inline-block text-left", className)}>
            <div>

                <Menu.Button>
                    <BsThreeDotsVertical className={twMerge(
                        "w-5 h-5 hover:text-gray-600 text-gray-900",
                        buttonClassName
                    )}/>
                </Menu.Button>
            </div>

            {/* Use transition for smooth appearance */}
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={twMerge(
                        "z-10 absolute right-0 origin-top-right divide-y divide-gray-200",
                        "ring-2 ring-black/5 focus:outline-none",
                        "mt-2 w-56",
                        "bg-white rounded-xl",
                        containerClassName
                    )}
                >
                    {/* Header */}
                    {header && <h6 className="py-1.5 px-2 font-semibold text-xs text-indigo-400 cursor-default">{header}</h6>}

                    {/* Iterate groups */}
                    {groups.map((items, i) => (
                        <div className="px-1 py-1" key={i}>

                            {/* Iterate group items */}
                            {items.map((item, i) => (
                                <ThreeDotMenuItem key={i} item={item}/>
                            ))}

                        </div>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}