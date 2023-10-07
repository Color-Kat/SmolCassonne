import React, {memo} from 'react';
import {ILinkProps} from "./types.ts";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import {shallowEqual} from "react-redux";
import {twMerge} from "tailwind-merge";

export const TextArrowLink: React.FC<ILinkProps> = memo(({
                                                        children,
                                                        to,
                                                        className,
                                                        ...props
                                                    }) => {

    return (
        <Link
            to={to}
            className={twMerge(
                "flex items-center justify-center gap-x-1 py-2 px-4 text-gray-700 hover:text-gray-900 font-medium duration-150 md:inline-flex",
                className
            )}
            {...props}
        >
            {children}
            <FaAngleRight/>
        </Link>
    );
});