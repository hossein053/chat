import { setCookie } from 'cookies-next';
import React from 'react';
import { toast } from 'react-toastify';

interface ToastProps {
    data?: {
        token?: string;
    };
    message?: string | string[];
}

export const ActionApi: React.FC<ToastProps> = (props) => {
    if (props?.data) {
        setCookie('token', props.data);
    }

    if (props?.message) {
        Array.isArray(props.message)
            ? props.message.forEach((msg) => toast(msg))
            : toast(props.message);
    }

    return null;
};
