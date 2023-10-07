import React, {InputHTMLAttributes} from "react";

export interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
    data: { [key: string]: any };
    setData: React.Dispatch<React.SetStateAction<any>>;
    name: string;

    onChange?: (e: any) => void;

    isError?: boolean;

    className?: string;
}

export interface InputProps extends SimpleInputProps {
    label?: string;
    description?: string;

    errorMessages?: string[];

    Icon?: any;

    containerClassName?: string;
}