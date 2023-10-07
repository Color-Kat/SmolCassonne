import React, {FormHTMLAttributes, InputHTMLAttributes, memo, useMemo} from 'react';
import {IValidatorErrors} from "@/types/laravelEntities/IValidatorErrors.ts";
import {twMerge} from "tailwind-merge";
import {Checkbox, FileInput, Input, SimpleInput, Textarea} from "@components/Inputs";
import {StandardButton} from "@UI/Buttons";
import {InputProps} from "@components/Inputs/Input/types.ts";
import {FileInputProps} from "@components/Inputs/FileInput.tsx";
import {CheckboxProps} from "@components/Inputs/Checkbox.tsx";

type FormField =
    string |
    {type?: 'text' | 'textarea' | 'email' | 'password' | 'number' | 'date'} & Omit<InputProps, 'data' | 'setData'> |
    {type: 'file'} & Omit<FileInputProps, 'data' | 'setData'> |
    {type: 'checkbox'} & Omit<CheckboxProps, 'data' | 'setData'>
;

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    data: { [key: string]: any };
    setData: React.Dispatch<React.SetStateAction<any>>;
    fields?: FormField[];

    errors?: IValidatorErrors;

    title?: string;
    buttonText?: string;
    ButtonComponent?: any;

    className?: string;
}

export const Form: React.FC<FormProps> = memo(({
                                                   data,
                                                   setData,
                                                   fields,

                                                   errors,

                                                   title,
                                                   buttonText = 'Отправить',
                                                   ButtonComponent = StandardButton,

                                                   className,
                                                   ...props
                                               }) => {

    return (
        <form
            {...props}
            className={twMerge(
                "flex flex-col text-left space-y-2",
                className
            )}
        >
            {title && <h3 className="text-lg font-semibold">{title}</h3>}

            {(fields ?? Object.keys(data)).map(field => {
                // Simple input
                if (typeof field == 'string')
                    return (
                        <SimpleInput
                            key={field}
                            data={data}
                            setData={setData}
                            name={field}
                        />
                    );

                // Input with label, description, icon and etc.
                if(
                    !field.type ||
                    field.type == 'text' ||
                    field.type == 'number' ||
                    field.type == 'password' ||
                    field.type == 'email' ||
                    field.type == 'date'
                )
                    return <Input
                        key={field.name}
                        data={data}
                        setData={setData}

                        {...field}
                    />;

                // Textarea
                if(field.type == 'textarea')
                    return <Textarea
                        key={field.name}
                        data={data}
                        setData={setData}

                        {...field}
                    />;

                if(field.type == 'checkbox')
                    return <Checkbox
                        key={field.name}
                        data={data}
                        setData={setData}
                        {...field}
                    />

                if(field.type == 'file')
                    return <FileInput
                        key={field.name}
                        data={data}
                        setData={setData}

                        {...field}
                    />;
            })}

            <ButtonComponent
                type="submit"
                className="w-full"
            >
                {buttonText}
            </ButtonComponent>
        </form>
    );
});