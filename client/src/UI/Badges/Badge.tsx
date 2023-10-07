import React, {memo} from 'react';
import {BadgeProps} from "./types.ts";

export const Badge: React.FC<BadgeProps> = memo(({children}) => {


    return (
        <span className="py-2 px-3 rounded-full font-semibold text-xs text-app-accent bg-blue-50">
            {children}
        </span>
    );
});