import React, {memo} from 'react';
import {ILinkProps} from "./types.ts";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import {twMerge} from "tailwind-merge";

export const FilledArrowLink: React.FC<ILinkProps> = memo(({
                                                          children,
                                                          to,
                                                          className,
                                                          ...props
                                                      }) => {
        return (
            <Link
                to={to}
                className={twMerge(
                    "flex items-center justify-center gap-1 py-2 px-4 text-white font-medium bg-app-accent duration-150 hover:bg-app-accent/90 active:bg-app-accent/90 rounded-full md:inline-flex",
                    className
                )}
                {...props}
            >
                {children}
                <FaAngleRight/>
            </Link>
        );
});