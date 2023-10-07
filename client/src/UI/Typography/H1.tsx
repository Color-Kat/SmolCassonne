import React, {memo} from 'react';
import {ITypographyElement} from "./types.tsx";
import {twMerge} from "tailwind-merge";

export const H1: React.FC<ITypographyElement> = memo(({
                                                          children,
                                                          className,
                                                          ...props
                                                      }) => {

    return (
        <h1
            className={twMerge(
                "text-4xl text-gray-800 font-extrabold sm:text-5xl",
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
});