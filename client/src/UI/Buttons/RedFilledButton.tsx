import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const RedFilledButton: React.FC<ButtonProps> = ({
                                                                children,
                                                                ...props
                                                            }) => {
    return (
        <button
            {...props}
            className={twMerge(
                'mx-auto uppercase border border-red-500 cursor-pointer flex justify-center items-center transition-colors',
                'text-sm rounded-lg px-5 py-2.5 w-36',
                'text-white hover:text-red-500 bg-red-500 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-red-300/50',
                'disabled:pointer-events-none disabled:text-red-100 disabled:bg-red-400',
                props.className
            )}
        >

            {children}
        </button>
    );
}