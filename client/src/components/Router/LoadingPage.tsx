import React from 'react';
import {RainbowLoader} from "@UI/Loaders";

interface LoadingPageProps {

}

export const LoadingPage: React.FC<LoadingPageProps> = ({}) => {
    return (
        <div className="w-full h-full flex items-center justify-center ">
            <RainbowLoader />
        </div>
    );
}