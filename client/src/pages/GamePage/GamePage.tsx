import {Helmet} from "react-helmet";
import {useTSelector} from "@hooks/redux.ts";
import React from "react";
import {HeroSection} from "@pages/HomePage/modules/HeroSection.tsx";
import {FeaturesSection} from "@pages/HomePage/modules/FeaturesSection.tsx";
import {CTASection} from "@pages/HomePage/modules/CTASection.tsx";
import {Page} from "@modules/PageTemplates";
import {LogoGridSection} from "@pages/HomePage/modules/LogoGridSection.tsx";
import {FaqSection} from "@pages/HomePage/modules/FAQSection.tsx";

export const GamePage = () => {
    
    return (
        <Page
            className="w-screen pt-0"
        >
            <Helmet>
                <title>СмолКассон</title>
                <link rel="canonical" href={import.meta.env.VITE_APP_URL + '/game'}/>
            </Helmet>

            <div>
                123
            </div>
        </Page>
    );
};