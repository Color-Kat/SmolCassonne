import React, {FunctionComponent, InputHTMLAttributes, ReactNode, useCallback} from "react";
import {twMerge} from "tailwind-merge";

export interface CheckboxProps extends InputHTMLAttributes<any> {
    data: { [key: string]: any };
    setData: React.Dispatch<React.SetStateAction<any>>;
    name: string;

    children: ReactNode;

    onChange?: (e: any) => void;

    className?: string;
    labelClassName?: string;
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({
                                                               children,
                                                               name,
                                                               data,
                                                               setData,
                                                               onChange,
                                                               className,
                                                               labelClassName,
                                                               ...props
                                                           }) => {
    const changeHandler = onChange
        ? onChange
        : useCallback(
            (e: any) => setData((prev: any) => ({
                ...prev,
                [name]: !prev[name]
            })),
            []
        );

    return (
        <label htmlFor={name} className={twMerge(
            "text-sm text-neutral-800 flex items-center pl-0.5 select-none",
            labelClassName
        )}>

            <input
                id={name}
                name={name}
                type="checkbox"
                checked={data[name]}

                onChange={changeHandler}

                className={twMerge(
                    "mr-2 accent-app-accent w-3.5 h-3.5",
                    className
                )}
                {...props}
            />

            {children}

        </label>
    );
};