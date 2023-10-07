import React, {memo} from 'react';

import VkLogo from './assets/VkLogo.svg';

export const VkIcon: React.FC<{className?: string}> = memo(({className}) => {
    return (
        <img src={VkLogo} alt="Vkontakte" className={className}/>
    );
});