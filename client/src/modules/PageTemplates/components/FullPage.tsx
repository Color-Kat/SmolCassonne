import React, {ReactNode, useCallback, useEffect} from 'react';
import ReactFullpage, {fullpageOptions} from "@fullpage/react-fullpage";

import './fullpage.scss';
import {useLayoutContext} from "@modules/Layout";
import {useBeforeUnload, useLocation} from "react-router-dom";
import {useComponentWillMount} from "@hooks/useComponentWillMount.ts";
import {twJoin} from "tailwind-merge";

/**
 * FullPageHOC is wrapper for entire page component that contains in root list of full page sections.
 * Every section must have [data-anchor="anchor-name"] and second parameter of FullPageHOC must contain
 * list of section anchors
 *
 * @param WrappedComponent
 * @param options
 * @constructor
 */
export function FullPageHOC(WrappedComponent: any, options: {anchors: string[]} & fullpageOptions) {
    return () => {
        const {setShowFooter} = useLayoutContext();

        useEffect(() => {
            // TODO footer show\hide
            setShowFooter(false); // Hide footer
        }, []);

        return (
            <div className={twJoin(
                "overflow-hidden relative w-full h-full",
            )}>
                <ReactFullpage
                    licenseKey = {'YOUR_KEY_HERE'}
                    scrollingSpeed = {700} /* Options here */
                    anchors={options?.anchors ?? []}
                    navigation={true}
                    navigationPosition="right"

                    // responsiveWidth={1024}
                    // responsive={1024}
                    // menu="#mobile-menu"

                    autoScrolling={true}

                    credits={{
                        enabled: true,
                    }}

                    render={({ fullpageApi }) => {
                        return (
                            <ReactFullpage.Wrapper>
                                <WrappedComponent fullpageApi={fullpageApi}/>
                            </ReactFullpage.Wrapper>
                        );
                    }}
                />
            </div>
        );
    }
}