import React, {Fragment, useCallback, useState} from 'react';
import {Combobox, Transition} from "@headlessui/react";
import {HiChevronUpDown} from "react-icons/hi2";
import {BsCheck2} from "react-icons/bs";
import {twJoin, twMerge} from "tailwind-merge";

interface AutocompleteProps {
    data: { [key: string]: any };
    setData: React.Dispatch<React.SetStateAction<any>>;
    name: string;
    options: string[];

    containerClassName?: string;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
                                                              data,
                                                              setData,
                                                              name,
                                                              options,
                                                              containerClassName
                                                          }) => {
    const [query, setQuery] = useState('');

    const onChangeHandler = useCallback((value: string) => {
        setData((prev: any) => ({...prev, [name]: value}));
    }, [name]);

    const filteredData =
        query === ''
            ? options
            : options.filter((item: any) =>
                item
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );

    return (
        <div className={twMerge(
            "w-56",
            containerClassName
        )}>
            <Combobox value={data[name]} onChange={onChangeHandler}>
                <div className="relative">
                    <div
                        className={twJoin(
                            "relative w-full cursor-default text-left z-0",
                            "focus:outline-none focus:ring-2 focus:ring-indigo-400/50",
                            "rounded-lg bg-white shadow-md text-sm"
                        )}
                    >
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none bg-transparent"
                            // displayValue={(value: string) => value}
                            onChange={(event) => setQuery(event.target.value)}
                        />

                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <HiChevronUpDown
                                className="h-5 w-5 text-app-accent" // text-gray-400
                                aria-hidden="true"
                            />
                        </Combobox.Button>

                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options
                            className={twJoin(
                                "absolute mt-1 max-h-60 w-full overflow-auto rounded-lg text-left py-1 shadow-lg text-sm z-[1]",
                                "bg-white/70 backdrop-blur-xl"
                            )}
                        >
                            {filteredData.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Ничего не найдено.
                                </div>
                            ) : (
                                filteredData.map((item: string) => (
                                    <Combobox.Option
                                        key={item}
                                        className={({active}) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-violet-100/50 text-violet-900' : 'text-gray-900'
                                            }`
                                        }
                                        value={item}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {item}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className="text-violet-600 absolute inset-y-0 left-0 flex items-center pl-3"
                                                    >
                                                    <BsCheck2 className="h-5 w-5" aria-hidden="true"/>
                                                </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}