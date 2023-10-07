import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const StandardFilledButton: React.FC<ButtonProps> = ({
                                                                children,
                                                                ...props
                                                            }) => {
    return (
        <button
            {...props}
            className={twMerge(
                'mx-auto uppercase border border-app-accent cursor-pointer flex justify-center items-center transition-colors',
                'text-sm rounded-lg px-5 py-2.5 w-36',
                'text-white hover:text-app-accent bg-app-accent hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-app-primary/30',
                'disabled:pointer-events-none disabled:text-gray-200 disabled:bg-app-primary',
                props.className
            )}
        >

            {children}
        </button>
    );
}