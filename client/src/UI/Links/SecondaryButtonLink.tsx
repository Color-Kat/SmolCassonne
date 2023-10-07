import React, {memo} from 'react';
import {ILinkProps} from "./types.ts";
import {Link} from "react-router-dom";
import {twMerge} from "tailwind-merge";

export const SecondaryButtonLink: React.FC<ILinkProps> = memo(({
                                                        children,
                                                        to,
                                                        className,
                                                        ...props
                                                    }) => {

    return (
        <Link
            to={to}
            className={twMerge(
                "inline-block py-2 px-4 text-gray-800 font-medium duration-150 border hover:bg-gray-50 active:bg-gray-100 rounded-lg",
                className
            )}
            {...props}
        >
            {children}
        </Link>
    );
});