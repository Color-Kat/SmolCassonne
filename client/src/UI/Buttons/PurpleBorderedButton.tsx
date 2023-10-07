import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import {twJoin, twMerge} from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const PurpleBorderedButton: React.FC<ButtonProps> = ({
                                                                children,
                                                                ...props
                                                            }) => {
    return (
        <button
            {...props}
            className={twJoin(
                `mx-auto uppercase text-center cursor-pointer inline-flex justify-center items-center`,
                'text-sm rounded-lg p-0.5 w-36',
                'relative overflow-hidden text-gray-900 group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-indigo-300/50',
                'disabled:pointer-events-none disabled:text-gray-500'
            )}
        >
            <span
                className={twMerge(
                    "w-full px-5 py-2.5 transition-all ease-in duration-75 bg-violet-100 rounded-md group-hover:bg-opacity-0",
                    props.className
                )}
            >
                {children}
            </span>
        </button>
    );
}