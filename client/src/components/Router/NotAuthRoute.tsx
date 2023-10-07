import React, {ReactNode} from 'react';
import {PrivateRoutes} from "@components/router/PrivateRoutes.tsx";
import {Route} from "react-router-dom";


export const NotAuthRoute: React.FC = ({}) => {
    return (
        <PrivateRoutes auth={false} />
    );
}