import React, {memo} from 'react';
import {FeaturesProps} from "./types.ts";
import {FeatureItem} from "./FeatureItem.tsx";
import {SecondaryFeatureItem} from "./SecondaryFeatureItem.tsx";

export const Features: React.FC<FeaturesProps> = memo(({
                                                           features,
                                                           secondary = false
                                                       }) => {
    return (
        <ul className="grid gap-y-12 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {
                features.map((feature, i) => (
                    <React.Fragment key={i}>{
                        secondary
                            ? <SecondaryFeatureItem feature={feature}/>
                            : <FeatureItem feature={feature}/>
                    }</React.Fragment>
                ))
            }
        </ul>
    );
});