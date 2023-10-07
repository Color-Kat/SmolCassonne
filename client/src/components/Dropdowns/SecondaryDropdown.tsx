import React, {Fragment, ReactNode, useMemo} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {BsChevronDown} from "react-icons/bs";
import {IDropdownItem} from "./components/DropdownItem.tsx";
import {SecondaryDropdownItem} from "./components/SecondaryDropdownItem.tsx";
import {twMerge} from "tailwind-merge";

interface DropdownProps {
    title?: ReactNode;
    ButtonComponent?: any;
    header?: string;
    className?: string;
    buttonClassName?: string;
    containerClassName?: string;
    itemClassName?: string;
}

type DropdownWithItemsProps = { items: IDropdownItem[] };

type DropdownWithGroupsProps = { groups: { [key: number]: IDropdownItem[] } };

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
export const SecondaryDropdown: React.FC<
    (DropdownWithItemsProps | DropdownWithGroupsProps) & DropdownProps
> = ({
         title = 'Options',
         ButtonComponent,
         header = '',
         className,
         buttonClassName,
         containerClassName,
         ...props
     }) => {

    // Make one group from non-grouped items list
    const groups: { [key: string]: IDropdownItem[] } = useMemo(() => {
        if ('groups' in props) return props.groups;
        else return {1: props.items} as any;
    }, []);

    return (
        <Menu as="div" className={twMerge("relative inline-block text-left", className)}>
            <div>

                {/* Custom button */}
                {ButtonComponent &&
                    <Menu.Button>
                        <ButtonComponent/>
                    </Menu.Button>
                }

                {/* Default button */}
                {!ButtonComponent &&
                    <Menu.Button
                        className={twMerge(
                            "inline-flex justify-center",
                            "focus:ring-2 focus:outline-none focus:ring-indigo-400",
                            "px-4 py-2",
                            "w-full bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm rounded-lg transition-colors duration-150 border border-gray-700",
                            buttonClassName
                        )}
                    >
                        {title}
                        <BsChevronDown
                            className="ml-2 -mr-1 h-5 w-5 text-violet-100 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                }
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
                        "z-10 absolute right-0 origin-top-right divide-y divide-indigo-400/50",
                        "focus:ring-2 focus:outline-none focus:ring-indigo-400",
                        "mt-2 w-56",
                        "bg-gray-800 border-2 border-indigo-400/50 shadow-lg rounded-xl",
                        containerClassName
                    )}
                >
                    {/* Header */}
                    {header && <h6 className="py-1.5 px-2 font-semibold text-indigo-400 cursor-default">{header}</h6>}

                    {/* Iterate groups */}
                    {Object.values(groups).map((items, i) => (
                        <div className="px-1 py-1" key={i}>

                            {/* Iterate group items */}
                            {items.map((item, i) => (
                                <SecondaryDropdownItem key={item.text + i} item={item}/>
                            ))}

                        </div>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}