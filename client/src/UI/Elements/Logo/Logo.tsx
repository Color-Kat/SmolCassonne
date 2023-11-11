import React, {memo} from 'react';
import {Link} from "react-router-dom";
import {twJoin, twMerge} from "tailwind-merge";

import logo from "@assets/logo.png";

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = memo(({className}) => {
    return (
        <div className={twMerge(
            "logo text-3xl font-bold text-blue-600 flex items-center justify-center hover:saturate-150",
            className
        )}>
            <Link to="/" className="h-full flex gap-1 items-end">
                <img
                    src={logo}
                    className="h-12"
                    alt="С"
                />
                <div className="font-bol text-4xl font-gabriela">молКассон</div>
            </Link>
        </div>
    );
});