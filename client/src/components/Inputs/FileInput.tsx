import React, {ChangeEvent, DragEvent, useCallback, useRef} from 'react';
import {BsFillTrashFill} from "react-icons/bs";
import {PinkButton} from "@UI/Buttons";
import {twMerge} from "tailwind-merge";

export interface FileInputProps extends Partial<HTMLInputElement> {

    data: { [key: string]: any };
    setData: React.Dispatch<React.SetStateAction<any>>;
    name: string;

    buttonText?: string;
    dragAndDropText?: string;
    containerClassName?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
                                                        data,
                                                        setData,
                                                        name,

                                                        buttonText = "Выберите фото",
                                                        dragAndDropText = "Перетащите фото сюда",
                                                        containerClassName,
                                                        ...props
                                                    }) => {
    const dragOverRef = useRef<HTMLDivElement>(null);

    /**
     * Add files to list by Browse button.
     */
    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        setData((prev: any) => ({
            ...prev,
            [name]: [
                ...prev[name],
                ...files
            ]
        }));
    }, []);

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        // Hover effect
        if(dragOverRef.current)
            dragOverRef.current.style.background = 'rgba(255, 255, 255, .4)';
    }, []);

    const handleDragEnd = useCallback(() => {
        // Reset hover effect
        if(dragOverRef.current)
            dragOverRef.current.style.background = 'none';
    }, []);

    /**
     * Add files to list by drag and drop.
     */
    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);

        if (props.multiple === undefined ?? true)
            setData((prev: any) => ({
                ...prev,
                [name]: [
                    ...prev[name],
                    ...files
                ]
            }));
        else  setData((prev: any) => ({...prev, [name]: [files[0]]}));

        // Reset hover effect
        if(dragOverRef.current)
            dragOverRef.current.style.background = 'none';
    }, []);

    /**
     * Delete one file.
     * @param file
     */
    const deleteFile = useCallback((file: File) => {
        setData((prev: any) => ({
            ...prev,
            [name]: prev[name].filter((prevFile: File) => prevFile !== file)
        }));
    }, []);

    /**
     * Clear all files
     */
    const clearFiles = useCallback(() => {
        setData((prev: any) => ({
            ...prev,
            [name]: []
        }));
    }, []);

    return (
        <div
            className={twMerge(
                "relative flex flex-col items-center justify-center",
                'transition-colors duration-300',
                "border-4 border-dashed border-violet-500 rounded-xl",
                "w-full max-w-4xl mx-auto min-h-[250px]",
                "md:p-8 p-4 text-gray-700",
                containerClassName
            )}
            ref={dragOverRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragEnd}
            onDrop={handleDrop}
        >

            <div
                className="flex flex-col items-center justify-center text-center"
            >
                <input
                    id="photoInput"
                    type="file"
                    accept={props.accept ?? 'image/*'}
                    multiple={props.multiple === undefined ?? true}
                    className="hidden"
                    onChange={handleFileChange}
                />
                {!data[name] || data[name].length === 0 ? (
                    <>
                        <div className="w-56">
                            {dragAndDropText}
                        </div>

                        <div className="w-full mt-2 relative">
                            ИЛИ
                            <div className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-gray-700 w-1/3"/>
                            <div className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-gray-700 w-1/3 right-0"/>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                            {data[name].map((file: File) => (
                                <div
                                    key={file.name}
                                    className="relative w-full h-40 rounded-lg overflow-hidden shadow-md"
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1 right-1 bg-white hover:bg-gray-100 text-violet-600 rounded-full w-8 h-8 text-xl flex items-center justify-center shadow-lg"
                                        onClick={() => deleteFile(file)}
                                    >
                                        <BsFillTrashFill/>
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="absolute bottom-5 left-5 bg-white hover:bg-gray-100 text-violet-600 rounded-full text-lg px-5 py-1.5 gap-1 flex items-center justify-center shadow-lg"
                                onClick={clearFiles}
                            >
                                Очистить <BsFillTrashFill/>
                            </button>
                        </div>
                    </>
                )}
            </div>

            <label htmlFor="photoInput" className="text-lg tracking-wide font-roboto cursor-pointer mt-3">
                <PinkButton className="w-max h-max px-8 pointer-events-none">
                    {buttonText}
                </PinkButton>
            </label>
        </div>
    );
}