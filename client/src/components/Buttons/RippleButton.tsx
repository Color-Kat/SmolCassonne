import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import {Loader} from "@UI/Loaders/Loader.tsx";
import {StandardButton} from "@UI/Buttons";

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    ButtonComponent?: any;
}

export const RippleButton: React.FC<RippleButtonProps> = ({
                                                  children,
                                                  ButtonComponent = StandardButton,
                                                  ...props
                                              }) => {

    props.className += ' relative';

    return (
        <ButtonComponent {...props}>
            {/* Ripple effect */}
            {!props.disabled && <div
                className="ripple-effect absolute top-0 left-0 h-full w-full rounded-xl overflow-hidden transform hover:scale-x-100 hover:scale-y-100 transition duration-500 ease-out">
            </div>}

            {children}
        </ButtonComponent>
    );
}