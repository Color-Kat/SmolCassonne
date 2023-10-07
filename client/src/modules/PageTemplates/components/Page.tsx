import React from "react";
import {twMerge} from "tailwind-merge";

interface PageProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * Page component adds paddings for pretty content displaying.
 */
export const Page: React.FC<PageProps> = ({children, className}) => {
    return ( 
        <div className={twMerge(
            'container px-2 sm:px-5 mx-auto',
            'pt-5 pb-16',
            className
        )}>

            {children}

        </div>
    );
};