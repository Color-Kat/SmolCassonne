import React, {memo, useState} from 'react';
import {RippleButton} from "@components/Buttons";
import {
    PurpleButton,
    SuccessButton,
} from "@UI/Buttons";
import {DoubleDropdown, Dropdown, SecondaryDropdown} from "@components/Dropdowns";
import {BsFillTrashFill, BsPerson} from "react-icons/bs";
import {Autocomplete, Checkbox, Input, RadioGroup, SecondarySelect, Select, Textarea, Toggle} from "@components/Inputs";
import {Modal, SecondaryModal} from "@UI/Modals";
import {Dialog} from "@headlessui/react";
import {Popover} from "@UI/Popover";
import {AiFillIeSquare} from "react-icons/ai";
import {Paginate, usePaginate} from "@components/Paginate";

interface RowProps {

}

export const Col4: React.FC<RowProps> = memo(({}) => {

    const [data, setData] = useState({
        select: 'Option 1',
        autocomplete: 'Anaconda',
        agree1: true,
        radio: 2,
        textarea: 123,
        date: '2005-12-06'
    });

    const {currentPage, pageCount, handlePageClick} = usePaginate(25, 5);


    return (
        <div className="flex items-center justify-center flex-col gap-5 max-w-sm">
            <div className="flex gap-3 items-end">
                <Dropdown
                    title="Dropdown"
                    header="List"
                    buttonClassName="bg-blue-500/100 hover:bg-blue-400"
                    containerClassName="w-32"
                    items={[
                        {text: 'Item 1'},
                        {text: 'Item 2'},
                        {text: 'Item 3'},
                        {text: 'Item 4'},
                        {text: 'Item 5'},
                    ]}
                />

                <Dropdown
                    title="Dropdown With Groups"
                    header="Pop-pup ;)"
                    containerClassName="bg-indigo-100"
                    groups={[
                        [
                            {text: 'group 1', onClick: () => alert("I'm one"),},
                            {text: 'group 1'}
                        ],
                        [
                            {text: 'group 2',}
                        ],
                        [
                            {
                                text: 'click me',
                                onClick: () => alert("Stop clicking on me!!!"),
                                Icon: BsFillTrashFill,
                                disabled: true
                            }
                        ]
                    ]}
                />
            </div>

            <div className="flex gap-3 w-full">
                <DoubleDropdown
                    title="Double Dropdown"
                    header="Choose your side"
                    groups={[
                        [
                            {text: 'group 0'},
                        ],
                        [
                            {
                                text: 'click me 1',
                                onClick: () => alert("Stop clicking on me!!!"),
                                Icon: BsFillTrashFill
                            }
                        ],
                        [
                            {text: 'group 2',},
                            {text: 'group 2',}
                        ],
                        [
                            {text: 'group 4',},
                            {text: 'group 4',}
                        ],
                    ]}
                />

                <SecondaryDropdown
                    title="Secondary"
                    header="Header"
                    className="ml-auto"
                    groups={[
                        [
                            {text: 'group 1', onClick: () => alert("I'm one"),},
                            {text: 'group 1'}
                        ],
                        [
                            {text: 'group 2',}
                        ],
                        [
                            {
                                text: 'click me',
                                onClick: () => alert("Stop clicking on me!!!"),
                                Icon: BsFillTrashFill
                            }
                        ]
                    ]}
                />
            </div>

            <div className="flex flex-col gap-3 w-full">
                <Select
                    data={data}
                    setData={setData}
                    name="select"
                    options={[
                        'Option 1',
                        'Opinion 2',
                        'Onion 3'
                    ]}
                    containerClassName="w-full"
                />

                <SecondarySelect
                    data={data}
                    setData={setData}
                    name="select"
                    options={[
                        'Option 1',
                        'Opinion 2',
                        'Onion 3'
                    ]}
                    containerClassName="w-full"

                />
            </div>

            <div className="flex flex-col gap-3 w-full">
                <Autocomplete
                    data={data}
                    setData={setData}
                    name="autocomplete"
                    options={[
                        'Anaconda',
                        'Banana',
                        'Banana 2',
                        'Colorbit.ru'
                    ]}
                    containerClassName="w-full"
                />
            </div>

            <div className="flex flex-wrap justify-between gap-3 w-full">
                <Toggle
                    data={data}
                    setData={setData}
                    name='agree1'
                    // activeClassName="bg-red-500"
                    // inactiveClassName="bg-black"
                />

                <Checkbox
                    data={data}
                    setData={setData}
                    name="agree1"
                >
                    Вынужден не согласиться
                </Checkbox>

                <Modal
                    ButtonComponent={({onClick}: any) => (
                        <RippleButton ButtonComponent={SuccessButton} onClick={onClick}>
                            Оплатить
                        </RippleButton>
                    )}
                    title="Payment successful"
                    text="Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order."
                    actionText="Got it, thanks!"
                    callback={() => console.log('Payment action')}
                />

                <Modal
                    buttonText="Модалька"
                >
                    {(closeModal) => (
                        <>
                            <Dialog.Title
                                as="h3"
                                className="text-3xl font-medium leading-6 text-indigo-900"
                            >
                                Успех
                            </Dialog.Title>

                            <div className="mt-4">
                                <p className="text-base text-indigo-500">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit minus porro
                                    reprehenderit veritatis.
                                </p>
                            </div>

                            <div className="mt-4 flex gap-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-lg border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={closeModal}
                                >
                                    Закройся
                                </button>

                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-lg border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={closeModal}
                                >
                                    Скройся
                                </button>
                            </div>
                        </>
                    )}
                </Modal>


                <SecondaryModal
                    ButtonComponent={({onClick}: any) => (
                        <PurpleButton onClick={onClick}>
                            Заказать
                        </PurpleButton>
                    )}
                    title="Заказ создан"
                    text="Ваш заказ успешно размещён. Оплатите его, и скоро мы отправим его вам!"
                    actionText="Ок"
                />

                <Popover
                    items={[
                        {
                            name: 'Insights',
                            description: 'Measure actions your users take',
                            href: '##',
                            icon: AiFillIeSquare,
                        },
                        {
                            name: 'Второй элемент',
                            description: 'Гугл',
                            href: 'https://google.com',
                            icon: AiFillIeSquare,
                        },
                        {
                            name: 'Reports',
                            description: 'Keep track of your growth',
                            href: '##',
                            icon: AiFillIeSquare,
                        },
                    ]}
                >
                    {(item, close) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={close}
                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                            <div
                                className="flex h-16 w-16 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12 bg-indigo-300 rounded-md"
                            >
                                <item.icon aria-hidden="true" className="h-10 w-10 rounded-sm"/>
                            </div>

                            <div className="ml-4 text-left">
                                <p className="text-sm font-medium text-gray-900">
                                    {item.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {item.description}
                                </p>
                            </div>
                        </a>
                    )}
                </Popover>
            </div>

            <div className="flex flex-wrap justify-between gap-3 w-full">
                <div className="flex gap-3 w-full">
                    <RadioGroup
                        data={data}
                        setData={setData}
                        name="radio"
                        options={[
                            {title: 'First', description: "Don't select this!", value: 1},
                            {title: 'Second', description: "Don't select this!", value: 2},
                            {title: 'Third', description: "Don't select this!", value: 3},
                        ]}
                        containerClassName="w-full"
                    ></RadioGroup>

                    <RadioGroup
                        data={data}
                        setData={setData}
                        name="radio"
                        options={[
                            {title: 'First', description: "Don't select this!", value: 1},
                            {title: 'Second', description: "Don't select this!", value: 2},
                            {title: 'Third', description: "Don't select this!", value: 3},
                        ]}
                        containerClassName="w-full p-1.5 rounded-xl bg-slate-800"
                        textClassName="text-gray-200"
                    ></RadioGroup>
                </div>
            </div>

            <div className="flex flex-wrap justify-between gap-3 w-full">
                <Input
                    data={data}
                    setData={setData}
                    name="lableInput"

                    type="email"
                    placeholder="Enter your email here"

                    label="Name"
                    description='Some description that describes this input.'

                    errorMessages={['Неверная почта или пароль']}

                    Icon={BsPerson}
                />

                <Textarea
                    data={data}
                    setData={setData}
                    name="textarea"
                />
            </div>

            <div className="flex flex-wrap justify-between gap-3 w-full">
                <Paginate
                    currentPage={currentPage}
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
            </div>
        </div>
    );
});