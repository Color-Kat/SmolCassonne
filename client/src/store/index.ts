import {configureStore} from "@reduxjs/toolkit";

import {authApi} from "@/store/auth/auth.api.ts";
import {authReducer} from "@/store/auth/auth.slice.ts";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        // test: testSlice.reducer
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        authApi.middleware
    )
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch