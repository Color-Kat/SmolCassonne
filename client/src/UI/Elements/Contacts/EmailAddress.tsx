import React, {memo} from 'react';
import {twMerge} from "tailwind-merge";
import {BsFillTelephoneFill} from "react-icons/bs";

interface EmailAddressProps {
    className?: string;
    address?: string;
}

export const EmailAddress: React.FC<EmailAddressProps> = memo(({className, address = 'admin@colorbit.ru'}) => {
    return (
        <div className={twMerge("flex gap-1.5 items-center", className)}>
            <BsFillTelephoneFill className="h-5 w-5 text-app-accent" />
            <a className="sm:text-lg font-bold cursor-pointer whitespace-nowrap" href={`mailto:${address}`}>
                {address}
            </a>
        </div>
    );
});