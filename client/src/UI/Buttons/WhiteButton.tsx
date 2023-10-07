import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const WhiteButton: React.FC<ButtonProps> = ({
                                                  children,
                                                  ...props
                                              }) => {
    return (
        <button
            {...props}
            className={twMerge(
                `mx-auto uppercase text-center cursor-pointer flex justify-center items-center`,
                'text-sm shadow-md rounded-lg px-5 py-2.5 w-36',
                'text-gray-700 bg-white hover:bg-gray-50 border broder-gray-500 focus:ring-2 focus:outline-none focus:ring-gray-100/50',
                'disabled:bg-white/50 disabled:text-gray-500 disabled:pointer-events-none',
                props.className
            )}
        >

            {children}

        </button>
    );
}