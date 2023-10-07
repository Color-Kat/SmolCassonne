import {memo, useEffect, useState} from "react";

import {Header} from "./Header/Header.tsx";
import Main from "./Main";
import {SimpleFooter} from "./SimpleFooter.tsx";
import {twJoin} from "tailwind-merge";
import {MobileBottomMenu} from "@modules/Layout/components/MobileBottomMenu.tsx";
import {Banner} from "@UI/Banners";
import {LayoutContext} from "@modules/Layout/LayoutContext.tsx";
import {Footer} from "@modules/Layout/components/Footer.tsx";

export const Layout: React.FC<{ children: React.ReactElement }> = memo(({children}) => {
    const [showFooter, setShowFooter] = useState(true);

    return (
        <LayoutContext.Provider value={{
            showFooter,
            setShowFooter
        }}>
            <div
                className={twJoin(
                    "h-screen w-screen flex flex-col",
                    // "scroll-container overflow-y-auto overflow-x-hidden", // Header can be scrolled

                    // "md:h-screen h-[calc(100vh-4.4rem)]", // For MobileBottomMenu
                    // "pt-16",// For header
                    "pb-[4.4rem] md:pb-0",// For MobileBottomMenu
                    "bg-app-dark font-inter"
                )}
            >

                {/*<div className="relative flex h-32 w-full bg-red-500"></div>*/}

                {/* Top banner */}
                <Banner
                    text="Мы запустили нашу собственную игру!"
                    link="https://colorbit.ru"
                    show={!localStorage.getItem('hide-banner-1') ?? false}
                    callback={() => localStorage.setItem('hide-banner-1', '1')}
                />

                <Header/>

                <div
                    className="scroll-container overflow-y-auto overflow-x-hidden flex flex-col flex-auto"> {/* Header at the top of the page */}
                    <Main>
                        {children}
                    </Main>

                    {showFooter && // Footer can be hide on page with full page scroll
                        // <SimpleFooter/>
                        <Footer />
                    }
                </div>

                <MobileBottomMenu/>

            </div>
        </LayoutContext.Provider>
    );
});