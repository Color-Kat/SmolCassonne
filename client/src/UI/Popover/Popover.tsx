import React, {Fragment, memo} from 'react';
import {Popover as PopoverComponent, Transition} from "@headlessui/react";
import {BsChevronDown} from "react-icons/bs";
import {twJoin} from "tailwind-merge";

interface PopoverProps {
    containerClassName?: string;

    items: any[];
    children: (item: this['items'][number], close?: () => void) => any;
}


export const Popover: React.FC<PopoverProps> = memo(({
                                                    items,
                                                    children,
                                                    containerClassName,
                                                }) => {

    return (
        <div className={twJoin(containerClassName)}>
            <PopoverComponent className="relative">
                {({open, close}) => (
                    <>
                        <PopoverComponent.Button
                            className={twJoin(
                                open ? '' : 'text-opacity-90',
                                "group inline-flex items-center",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                                "px-4 py-1.5 text-base font-medium",
                                "text-white bg-black/30 hover:bg-black/40 rounded-lg"
                            )}
                        >
                            <span>Меню</span>
                            <BsChevronDown
                                className={twJoin(
                                    open ? '' : 'text-opacity-70',
                                    "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                                    "text-violet-100 group-hover:text-opacity-100"
                                )}
                                aria-hidden="true"
                            />
                        </PopoverComponent.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverComponent.Panel
                                className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0"
                            >
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/10">
                                    <div className="relative grid gap-8 bg-white p-7">
                                        {items.map((item) =>
                                            children(item, close)
                                        )}
                                    </div>
                                </div>
                            </PopoverComponent.Panel>
                        </Transition>
                    </>
                )}
            </PopoverComponent>
        </div>
    )
});