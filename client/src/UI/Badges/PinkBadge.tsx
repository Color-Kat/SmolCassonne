import React, {memo} from 'react';
import {BadgeProps} from "./types.ts";


export const PinkBadge: React.FC<BadgeProps> = memo(({children}) => {
    return (
        <span className="py-2 px-3 rounded-full font-semibold text-xs text-pink-600 bg-pink-50">
            {children}
        </span>
    );
});