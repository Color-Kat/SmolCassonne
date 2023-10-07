import React, {memo, ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface BorderLineEffectProps {
    children?: ReactNode;
    effectClassName?: string;
    as?: any;
}

export const BorderUpLineEffect: React.FC<BorderLineEffectProps> = memo(({
                                                                           children,
                                                                           effectClassName,
                                                                           as = 'div'
                                                                       }) => {
    const As = as;

    return (
        <As className="relative group px-2 sm:px-3 md:px-4 py-1.5 rounded-lg overflow-hidden">
            {children}
            <span className={twMerge(
                "absolute left-0 bottom-0 rounded-sm w-full h-0.5 bg-blue-400 -z-10 group-hover:h-full group-hover:transition-all",
                effectClassName
            )} />
        </As>
    );
});