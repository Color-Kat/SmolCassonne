import React from 'react';
import {useTSelector} from "@hooks/redux.ts";
import {Navigate, Outlet} from "react-router-dom";
import {Roles} from "@/store/auth/auth.slice.ts";
import {LoadingPage} from "@components/router/LoadingPage.tsx";

interface PrivateRoutesProps {
    auth?: boolean;
    roleId?: Roles;
}

/**
 * Redirect to specific pages if user doesn't pass the checks.
 * (Guarded route)
 *
 * @param auth
 * @param roleId
 * @constructor
 */
export const PrivateRoutes: React.FC<PrivateRoutesProps> = ({
                                                                auth = true ,
                                                                roleId
                                                            }) => {
    const {user, isLoading} = useTSelector(state => state.auth);

    if(isLoading) return <LoadingPage />;

    // User must be logged in
    if(auth && !user) return <Navigate to="/login"/>;

    // Authorized in user can't reach this page (login, register)
    if(!auth && user) return <Navigate to="/" replace/>;

    // Check role
    if(roleId && user?.role_id !== roleId) return <Navigate to="/?403" replace/>;

    // Everything is alright, render route component
    return (
        <Outlet />
    );
}