import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const SuccessButton: React.FC<ButtonProps> = ({
                                                  children,
                                                  ...props
                                              }) => {


    return (
        <button
            {...props}
            className={twMerge(
                `mx-auto uppercase text-center cursor-pointer flex justify-center items-center`,
                'text-sm shadow-md rounded-lg px-5 py-2.5 w-36',
                'text-white bg-gradient-to-r from-green-500 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300/50',
                'disabled:from-green-400 disabled:via-green-400 disabled:to-green-500 disabled:hover:bg-gradient-to-r',
                props.className
            )}
        >

            {children}

        </button>
    );
}