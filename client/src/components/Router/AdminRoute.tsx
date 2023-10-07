import React from 'react';
import {PrivateRoutes} from "@components/router/PrivateRoutes.tsx";
import {Roles} from "@/store/auth/auth.slice.ts";

export const AdminRoute: React.FC = ({}) => {
    return (
        <PrivateRoutes auth={true} roleId={Roles.Admin} />
    );
}