import React, {memo} from 'react';
import {twMerge} from "tailwind-merge";
import {BsEnvelope} from "react-icons/bs";

interface PhoneNumberProps {
    className?: string;
    tel?: string;
}

export const PhoneNumber: React.FC<PhoneNumberProps> = memo(({className, tel = '+7 920 314 99 99'}) => {
    return (
        <div className={twMerge("flex gap-1.5 items-center", className)}>
            <BsEnvelope className="h-7 w-7 text-app-accent font-bold" />
            <a className="sm:text-lg font-bold cursor-pointer whitespace-nowrap" href={`tel:${tel}`}>
                {tel}
            </a>
        </div>
    );
});