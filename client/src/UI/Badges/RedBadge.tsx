import React, {memo} from 'react';
import {BadgeProps} from "./types.ts";


export const RedBadge: React.FC<BadgeProps> = memo(({children}) => {
    return (
        <span className="py-2 px-3 rounded-full font-semibold text-xs text-red-600 bg-red-50">
            {children}
        </span>
    );
});