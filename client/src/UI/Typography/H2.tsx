import React, {memo} from 'react';
import {ITypographyElement} from "./types.tsx";
import {twMerge} from "tailwind-merge";

export const H2: React.FC<ITypographyElement> = memo(({
                                                          children,
                                                          className,
                                                          ...props
                                                      }) => {

    return (
        <h1
            className={twMerge(
                "text-3xl text-gray-800 font-bold sm:text-4xl",
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
});