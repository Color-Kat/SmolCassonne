import React, {memo} from 'react';

import TgLogo from './assets/TgLogo.svg';

export const TgIcon: React.FC<{className?: string}> = memo(({className}) => {
    return (
        <img src={TgLogo} alt="Vkontakte" className={className}/>
    );
});