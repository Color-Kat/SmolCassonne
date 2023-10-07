import React, {memo} from 'react';
import {BadgeProps} from "./types.ts";


export const GreenBadge: React.FC<BadgeProps> = memo(({children}) => {
    return (
        <span className="py-2 px-3 rounded-full font-semibold text-xs text-green-600 bg-green-50">
            {children}
        </span>
    );
});