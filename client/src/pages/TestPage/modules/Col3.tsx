import React, {memo, useCallback, useState} from 'react';
import {RainbowLoader} from "@UI/Loaders";
import {Button, LoadingButton, RippleButton} from "@components/Buttons";
import {
    BlueButton,
    BorderedButton, PurpleBorderedButton, RedBorderedButton,
    GrayButton,
    LimeButton,
    PinkButton,
    PurpleButton,
    SuccessButton,
    WhiteButton
} from "@UI/Buttons";
import {RedFilledButton} from "@UI/Buttons/RedFilledButton.tsx";
import {Form} from "@components/Form";
import {BsPerson} from "react-icons/bs";
import {MdEmail} from "react-icons/md";
import {Calendar} from "@components/Inputs";

interface RowProps {

}

export const Col3: React.FC<RowProps> = memo(({}) => {
    const [form, setForm] = useState({
        image: null,
        name: '',
        email: '',
        password: '',
        text: 'text',
        number: 999,
        agree: false,
        date: '2005-12-06'
    });

    return (
        <div className="flex items-center justify-center flex-col gap-5 max-w-sm">
            <Form
                title="Form component"
                data={form}
                setData={setForm}
                fields={[
                    {
                        name: 'image',
                        type: 'file',
                        containerClassName: 'min-h-32 border-red-500'
                    },
                    {
                        name: 'name',
                        Icon: BsPerson,
                        placeholder: 'Имя',
                    },
                    {
                        name: 'email',
                        Icon: MdEmail,
                        placeholder: 'Почта'
                    },
                    {
                        name: 'password',
                        type: 'password',
                        placeholder: 'Пароль'
                    },
                    {
                        name: 'text',
                        type: 'textarea',
                        placeholder: 'Текст'
                    },
                    {
                        name: 'number',
                        type: 'number',
                        label: 'Кол-во хромосом:',
                        description: 'Сколько их у вас?',
                        className: 'bg-slate-800 text-white',
                    },
                    {
                        name: 'agree',
                        type: 'checkbox',
                        children: 'Согласен взять $1 000 000 бесплатно'
                    },
                ]}
                ButtonComponent={RedFilledButton}
            />

            <Calendar
                data={form}
                setData={setForm}
                name="date"
            />
        </div>
    );
});