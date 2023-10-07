import React, {memo} from 'react';
import {BadgeProps} from "./types.ts";


export const GoldBadge: React.FC<BadgeProps> = memo(({children}) => {
    return (
        <span className="py-2 px-3 rounded-full font-semibold text-xs text-amber-600 bg-amber-50">
            {children}
        </span>
    );
});