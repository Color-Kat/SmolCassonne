import React, {ReactNode} from "react";
import {LinkProps} from "react-router-dom";

export interface ILinkProps extends Omit<LinkProps, 'to'>{
    children: ReactNode;
    to: string;
    className?: string;
}