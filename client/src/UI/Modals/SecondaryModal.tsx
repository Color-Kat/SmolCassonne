import React, {Fragment, useCallback, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {BsX} from "react-icons/bs";
import {twMerge} from "tailwind-merge";

const DefaultLayout = ({
                            title,
                            text,
                           actionText,
                            callback
                       }: any) => (
    <>
        <Dialog.Title
            as="h3"
            className="text-xl font-medium leading-6 text-gray-300"
        >
            {title}
        </Dialog.Title>

        <div className="mt-2">
            <p className="text-base text-gray-400">
                {text}
            </p>
        </div>

        <div className="mt-4">
            <button
                type="button"
                className="inline-flex justify-center rounded-lg border border-transparent bg-slate-500 px-4 py-1.5 text-base font-medium text-blue-100 hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={callback}
            >
                {actionText}
            </button>
        </div>
    </>
);

interface ModalProps {
    buttonText?: string;
    ButtonComponent?: any;

    title?: string;
    text?: string;
    actionText?: string;
    callback?: () => void;

    buttonClassName?: string;
    modalClassName?: string;

    children?: (closeModal: any) => any;
}

export const SecondaryModal: React.FC<ModalProps> = ({
                                                        buttonText,
                                                        ButtonComponent,
                                                        title,
                                                        text,
                                                        actionText,
                                                        callback,
                                                        buttonClassName,
                                                        modalClassName,
                                                         children
                                                    }) => {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const actionClick = useCallback(() => {
        if(callback) callback();
        closeModal();
    }, []);

    return (
        <>
            <div className="inset-0 flex items-center justify-center">
                {ButtonComponent && <ButtonComponent onClick={openModal}/>}

                {!ButtonComponent &&
                    <button
                        type="button"
                        onClick={openModal}
                        className={twMerge(
                            "text-sm font-medium",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                            "px-4 py-2 ",
                            "rounded-lg bg-black/30 hover:bg-black/40 text-white",
                            buttonClassName
                        )}
                    >
                        {buttonText}
                    </button>
                }
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className={twMerge(
                                        "relative w-full transform overflow-hidden text-left align-middle transition-all",
                                        "max-w-md rounded-2xl bg-slate-800 p-6 shadow-xl",
                                        modalClassName
                                    )}
                                >
                                    <button
                                        type="button"
                                        className="absolute top-2  right-2 w-8 h-8 leading-4 flex items-center justify-center text-lg font-bold focus:outline-none focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-blue-500/10"
                                        onClick={closeModal}
                                    >
                                        <BsX className='text-gray-300 hover:text-gray-200 h-10 w-10'/>
                                    </button>

                                    {/* Default layout*/}
                                    {!children && <DefaultLayout
                                        title={title}
                                        text={text}
                                        actionText={actionText}
                                        callback={actionClick}
                                    />}

                                    {/*  Custom layout  */}
                                    {children && <>{children(closeModal)}</>}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}