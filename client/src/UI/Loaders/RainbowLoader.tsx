import React from 'react';
import {LoaderProps} from "@UI/Loaders/types.ts";
import {twJoin} from "tailwind-merge";

/**
 * Google like loader
 */
export const RainbowLoader: React.FC<LoaderProps> = ({className}) => {
    // You can add width to props
    return (
        <div className={twJoin("rainbow-loader", className)}>
            <svg className="circular" viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
        </div>
    );
}