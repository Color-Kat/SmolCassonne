import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

/**
 * Automatically apply primary color.
 *
 * @param children
 * @param props
 * @constructor
 */
export const StandardButton: React.FC<ButtonProps> = ({
                                                  children,
                                                  ...props
                                              }) => {
    return (
        <button
            {...props}
            className={twMerge(
                `mx-auto uppercase cursor-pointer flex justify-center items-center`,
                'text-sm shadow-md rounded-lg px-5 py-2.5 w-36',
                'focus:outline-none text-white bg-app-accent hover:bg-app-primary focus:ring-4 focus:ring-app-primary/30',
                'disabled:bg-red-500 disabled:hover:bg-red-600',
                props.className
            )}
        >

            {children}

        </button>
    );
}