'use client'
import { useFormStatus } from "react-dom";
import { ImageUploaderProps, PropsButton, SelectProps, TextareaProps, TextProps } from "./type.d";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from 'react';


export const Text: React.FC<TextProps> = ({ className, type, name, title, defaultValue, onChange, value, icon }) => {
    return (
        <div className={'inputs ' + className}>
            <input
                onChange={onChange}
                placeholder={title}
                defaultValue={defaultValue}
                id={name}
                type={type || "text"}
                className='peer'
                name={name}
                autoComplete="off"
                readOnly
                value={value}
                onClick={(e: any) => { e.target.readOnly = false }}
            />
            <label htmlFor={name} className='label-peer'>
                {icon && <span className="icon">{icon}</span>}
                <span>{title}</span>
            </label>
        </div>
    )
}

export const Textarea: React.FC<TextareaProps> = ({ className, name, title, defaultValue, onChange, value, icon }) => {
    return (
        <div className={'inputs ' + className}>
            <textarea
                placeholder={title}
                name={name}
                id={name}
                className='peer'
                defaultValue={defaultValue}
                onChange={onChange}
                rows={4}
                value={value}
            />
            <label htmlFor={name} className='label-peer'>
                {icon && <span className="icon">{icon}</span>}
                <span>{title}</span>
            </label>
        </div>
    );
};

export const File: React.FC<ImageUploaderProps> = ({ className, name, onChange }) => {
    const [image, setImage] = useState<File | null>(null);
    return (
        <div className={className}>
            <div className="relative bg-white outline-none border-b-2 overflow-hidden border-b-purple_55 rounded-lg p-2.5 row h-[150px]">
                <input
                    type="file"
                    name={name}
                    className="w-full h-full opacity-0 absolute top-0 start-0 z-[2] cursor-pointer"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const file = event.target.files && event.target.files[0];
                        if (onChange) {
                            onChange(file)
                        }
                        if (file) {
                            setImage(file);
                        }
                    }}
                />
                {!image && <p className="text-center">Drag or click the photo here to select.</p>}
                {image &&
                    <Image
                        src={URL.createObjectURL(image)}
                        alt=""
                        width={1000}
                        height={0}
                        className="w-full h-full object-contain"
                    />}
            </div>
        </div>
    )
}

export const Select: React.FC<SelectProps> = ({ data = [], className, name, title, defaultValue, onChange, value, icon }) => {
    return (
        <div className={className}>
            <div className='inputs'>
                <input
                    onChange={onChange}
                    placeholder={title}
                    defaultValue={defaultValue}
                    id={name}
                    dir='rtl'
                    type={"text"}
                    className='peer'
                    name={name}
                    autoComplete="off"
                    readOnly
                    value={value}
                    onClick={(e: any) => { e.target.readOnly = false }}
                />
                {icon && <span className="mx-1 w-6 min-w-6 h-6 cursor-pointer">{icon}</span>}
                <label htmlFor={name} className='label-peer'>
                    <span>{title}</span>
                </label>
                {data.length > 0
                    ?
                    <ul className="ul hidden w-full max-h-40 bg-white text-black overflow-y-scroll no-scrollbar border-b-2 border-b-purple_55 rounded-lg p-2.5 absolute z-10 top-[3.25rem] start-0">
                        <li className="text-center">There is no data!</li>
                    </ul>
                    :
                    <ul className="ul hidden w-full max-h-40 bg-white text-black overflow-y-scroll no-scrollbar border-b-2 border-b-purple_55 rounded-lg p-2.5 absolute z-10 top-[3.25rem] start-0">
                        <li className="text-center">There is no data!</li>
                    </ul>
                }
            </div>
        </div>
    )
}

export const Checkbox = () => {
    return (
        <label className="relative cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div
                className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]">
            </div>
        </label>
    )
}

export const SubmitButton: React.FC<PropsButton> = ({ text = 'Sign up', ...props }) => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} {...props}>{pending ? 'صبر کنید...' : text}</Button>
    );
}