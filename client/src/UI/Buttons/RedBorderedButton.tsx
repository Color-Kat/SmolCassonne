import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const RedBorderedButton: React.FC<ButtonProps> = ({
                                                                children,
                                                                ...props
                                                            }) => {
    return (
        <button
            {...props}
            className={twMerge(
                'mx-auto uppercase border border-red-500 cursor-pointer flex justify-center items-center transition-colors',
                'text-sm rounded-lg px-5 py-2.5 w-36',
                'text-red-500 border border-red-500 bg-transparent hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300/50',
                'disabled:pointer-events-none disabled:text-red-400 disabled:border-red-400',
                props.className
            )}
        >

            {children}
        </button>
    );
}