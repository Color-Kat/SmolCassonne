import React, {memo, ReactNode} from 'react';
import {twMerge} from "tailwind-merge";

interface BorderLineEffectProps {
    children?: ReactNode;
    active?: boolean;
    effectClassName?: string;
    as?: any;
}

export const BorderRightLineEffect: React.FC<BorderLineEffectProps> = memo(({
                                                                                children,
                                                                                active = false,
                                                                                effectClassName,
                                                                                as = 'div'
                                                                            }) => {
    const As = as;

    return (
        <As className="relative group px-2 sm:px-3 md:px-4 py-1.5">
            {children}
            <span className={twMerge(
                "absolute bottom-0 left-0 w-0 h-0.5 bg-app-primary transition-all rounded-full group-hover:w-full",
                active && "w-full",
                effectClassName
            )}/>
        </As>
    );
});