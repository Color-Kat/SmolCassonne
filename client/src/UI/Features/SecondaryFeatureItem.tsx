import React, {memo} from 'react';
import {IFeature} from "@UI/Features/types.ts";


export const SecondaryFeatureItem: React.FC<{feature: IFeature}> = memo(({feature}) => {
    return (
        <li className="space-y-3 text-center">
            <div className="w-12 h-12 mx-auto bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                <feature.Icon className="h-6 w-6" />

            </div>
            <h4 className="text-lg text-gray-800 font-semibold">
                {feature.title}
            </h4>
            <p>
                {feature.description}
            </p>
        </li>
    );
});