import React, {ReactNode} from 'react';
import {PrivateRoutes} from "@components/Router/PrivateRoutes.tsx";
import {Route} from "react-router-dom";


export const AuthRoute: React.FC = ({}) => {
    return (
        <PrivateRoutes auth={true} />
    );
}