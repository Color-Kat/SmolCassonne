import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Cookies from "js-cookie";
import { authApi } from "@/store/auth/auth.api.ts";

import { store } from "@/store";
import App from "./App.tsx";
import '@scss/index.scss';

/**
 * Load user data
 */
const loadUser = () => {
    store.dispatch(authApi.endpoints.getUser.initiate());
}

// Get CSRF token for API and first load user data
if (!Cookies.get('XSRF-TOKEN'))
    fetch('/sanctum/csrf-cookie', {
        headers: {
            'Accept': 'application/json'
        },
        credentials: 'include'
    }).then(response => loadUser());
else loadUser();

createRoot(document.getElementById('app') as HTMLElement).render(
    // <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    // </React.StrictMode>,
);