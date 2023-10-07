import React, {memo} from 'react';
import {IFeature} from "@UI/Features/types.ts";


export const FeatureItem: React.FC<{feature: IFeature}> = memo(({feature}) => {
    return (
        <li  className="flex gap-x-4">
            <div className="flex-none w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <feature.Icon className="h-6 w-6" />
            </div>
            <div>
                <h4 className="text-lg text-gray-800 font-semibold">
                    {feature.title}
                </h4>
                <p className="mt-3">
                    {feature.description}
                </p>
            </div>
        </li>
    );
});