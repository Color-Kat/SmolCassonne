import React, {useCallback} from "react";


// TODO !!!!!!!!

export const useChangeHandler = (
    name: string,
    setData: React.Dispatch<React.SetStateAction<any>>,
    onChange: null | ((e: any) => void) = null
) => {
    return onChange
        ? onChange
        : useCallback(
            (e: any) => setData((prev: any) => ({
                ...prev,
                [name]: e.target.value
            })),
            []
        )
}