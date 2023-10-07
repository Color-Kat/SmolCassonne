import React, {useCallback} from 'react';
import {RadioGroup as RadioGroupComponent} from "@headlessui/react";
import {twJoin, twMerge} from "tailwind-merge";

interface RadioGroupProps {
    data: { [key: string]: any };
    setData: React.Dispatch<React.SetStateAction<any>>;
    name: string;
    options: {
        title: string;
        description?: string;
        value: any;
    }[];

    containerClassName?: string;
    textClassName?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
                                                          data,
                                                          setData,
                                                          name,
                                                          options,
                                                          containerClassName,
                                                          textClassName
                                                      }) => {

    const setSelected = useCallback((value: any) => {
        setData((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }, []);

    return (
        <div className={twMerge(
            "w-full",
            containerClassName
        )}>
            <div className="mx-auto w-full max-w-md">
                <RadioGroupComponent value={data[name]} onChange={setSelected}>
                    <RadioGroupComponent.Label className="sr-only">Server size</RadioGroupComponent.Label>
                    <div className="space-y-2">
                        {options.map((option, i) => (
                            <RadioGroupComponent.Option
                                key={option.title}
                                value={option.value}
                                className={({active, checked}) => twJoin(
                                    checked ? 'text-sky-500' : '',
                                    "relative flex cursor-pointer rounded-lg focus:outline-none"
                                )}
                            >
                                {({active, checked}) => (
                                    <div className="flex w-full items-center gap-3">
                                        <div className={twJoin(
                                            "shrink-0 text-white h-5 w-5",
                                            "rounded-full bg-white",
                                            checked ? 'border-4 border-indigo-500/80' : 'border-2 border-gray-400',
                                            active && 'ring-2 ring-indigo-300/50'
                                        )}>
                                        </div>

                                        <div className="flex items-center text-base">
                                            <RadioGroupComponent.Label
                                                as="p"
                                                className={twJoin(
                                                    "font-medium",
                                                    textClassName
                                                        ? textClassName
                                                        : checked ? 'text-indigo-500' : 'text-gray-800',
                                                )}
                                            >
                                                {option.title}
                                            </RadioGroupComponent.Label>
                                        </div>
                                    </div>
                                )}
                            </RadioGroupComponent.Option>
                        ))}
                    </div>
                </RadioGroupComponent>
            </div>
        </div>
    );
}