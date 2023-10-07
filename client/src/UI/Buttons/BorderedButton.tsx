import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const BorderedButton: React.FC<ButtonProps> = ({
                                                  children,
                                                  ...props
                                              }) => {
    return (
        <button
            {...props}
            className={twMerge(
                `mx-auto uppercase tracking-widest text-center cursor-pointer flex justify-center items-center`,
                'text-sm rounded-lg px-5 py-2.5 w-36',
                'text-gray-700 hover:text-white bg-transparent hover:bg-zinc-400 border-zinc-400 border-2 focus:ring-2 focus:outline-none focus:ring-gray-400/50',
                'disabled:bg-zinc-50/50 disabled:border-zinc-300 disabled:pointer-events-none',
                props.className
            )}
        >

            {children}

        </button>
    );
}