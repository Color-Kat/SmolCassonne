import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const PurpleButton: React.FC<ButtonProps> = ({
                                                  children,
                                                  ...props
                                              }) => {
    return (
        <button
            {...props}
            className={twMerge(
                `mx-auto uppercase text-center cursor-pointer flex justify-center items-center`,
                'text-sm shadow-md rounded-lg px-5 py-2.5 w-36',
                'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300/50',
                'disabled:from-purple-500 disabled:to-blue-400',
                props.className
            )}
        >

            {children}

        </button>
    );
}