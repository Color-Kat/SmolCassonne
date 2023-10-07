import React, {ReactNode} from "react";

export interface ITypographyElement extends React.HTMLAttributes<HTMLHeadingElement>{
    children: ReactNode;
    className?: string;
}