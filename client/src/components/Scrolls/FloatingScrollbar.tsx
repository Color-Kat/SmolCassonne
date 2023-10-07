import React, {memo, ReactNode, useEffect, useRef} from 'react';
import {twMerge} from "tailwind-merge";

interface FloatingScrollProps extends React.HTMLAttributes<HTMLDivElement>  {
    children: ReactNode;
    scrollbarClassName?: string;
}

/**
 * Create a floating scrollbar that is always visible on the page.
 */
export const FloatingScrollbar: React.FC<FloatingScrollProps> = memo(({
                                                                       children,
                                                                          scrollbarClassName,
                                                                        ...props
                                                                   }) => {

    const scrollableRef = useRef<HTMLDivElement>(null);
    const scrollbarRef = useRef<HTMLDivElement>(null);

    // Set the width of scrollbar content to equal the width of the children content
    useEffect(() => {
        if(scrollableRef.current && scrollbarRef.current) {
            scrollbarRef.current.style.width = scrollableRef.current.scrollWidth + 40 + 'px';
        }
    }, [children, scrollableRef.current, scrollbarRef.current]);

    // Synchronize two scrolls with each other
    const scroll = (e: any) => {
        if(scrollableRef.current)
            scrollableRef.current.scrollLeft = e.target.scrollLeft;

        if(scrollbarRef.current && scrollbarRef.current.parentElement)
            scrollbarRef.current.parentElement.scrollLeft = e.target.scrollLeft;
    }

    return (
        <div
            {...props}
            ref={scrollableRef}
            onScroll={scroll}
        >
            {/* Scrollbar */}
            <div
                className={twMerge(
                    "fixed bottom-5 h-5 w-[calc(100vw-40px)] -ml-5 md:block hidden z-10 overflow-x-scroll shadow-xl rounded-xl",
                    scrollbarClassName
                )}
                onScroll={scroll}
            >
                <div
                    className="h-full bg-gray-100 shadow-md rounded-xl"
                    ref={scrollbarRef}
                ></div>
            </div>

            {children}
        </div>
    );
});