import {createContext, useContext} from "react";

/**
 * LayoutContext manage layout elements displaying.
 */
export const LayoutContext = createContext({
    showFooter: true,
    setShowFooter: (value: boolean) => {}
});

/**
 * Change parameters of Layout context.
 */
export const useLayoutContext = () => {
    return useContext(LayoutContext);
};