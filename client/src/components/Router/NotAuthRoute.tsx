import React, {ReactNode} from 'react';
import {PrivateRoutes} from "@components/Router/PrivateRoutes.tsx";


export const NotAuthRoute: React.FC = ({}) => {
    return (
        <PrivateRoutes auth={false} />
    );
}