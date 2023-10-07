import React, {memo} from 'react';

import YoutubeIconLight from './assets/YoutubeLogoLight.png';
import YoutubeIconDark from './assets/YoutubeLogoDark.png';
import {twJoin} from "tailwind-merge";


export const YoutubeIcon: React.FC<{className?: string, dark?: boolean}> = memo(({className, dark}) => {
    return (
        <img
            src={dark ? YoutubeIconDark : YoutubeIconLight}
            alt="Youtube"
            className={twJoin(
                className,
                'object-contain'
            )}
        />
    );
});