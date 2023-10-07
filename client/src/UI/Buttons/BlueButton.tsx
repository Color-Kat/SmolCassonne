import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const BlueButton: React.FC<ButtonProps> = ({
                                                  children,
                                                  ...props
                                              }) => {


    return (
        <button
            {...props}
            className={twMerge(
                `mx-auto uppercase text-center cursor-pointer flex justify-center items-center`,
                'text-sm shadow-md rounded-lg px-5 py-2.5 w-36',
                'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300/50',
                'disabled:from-blue-400 disabled:via-blue-400 disabled:to-blue-500',
                props.className
            )}
        >

            {children}

        </button>
    );
}