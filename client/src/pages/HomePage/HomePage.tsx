import {Helmet} from "react-helmet";
import {useTSelector} from "@hooks/redux.ts";
import React from "react";
import {HeroSection} from "@pages/HomePage/modules/HeroSection.tsx";
import {FeaturesSection} from "@pages/HomePage/modules/FeaturesSection.tsx";
import {CTASection} from "@pages/HomePage/modules/CTASection.tsx";
import {Page} from "@modules/PageTemplates";
import {LogoGridSection} from "@pages/HomePage/modules/LogoGridSection.tsx";
import {FaqSection} from "@pages/HomePage/modules/FAQSection.tsx";
import {Rules} from "@pages/HomePage/modules/Rules.tsx";

export const HomePage = () => {
    const user = useTSelector(state => state.auth.user);

    return (
        <div
            className="w-screen pt-0"
        >
            <Helmet>
                <title>СмолКассон - Главная</title>
                <link rel="canonical" href={import.meta.env.VITE_APP_URL + '/'}/>
            </Helmet>

            <HeroSection />

            <FeaturesSection />

            <Rules />

            <FaqSection />

            <LogoGridSection />

            <CTASection />
        </div>
    );
};