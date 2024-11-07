"use client";

import { useUser } from '@/context/UserContext';
import { API } from '@/services/api';
import { useState, FormEvent } from 'react';
import { socket } from './getListMessage';


export const FormSendMessage = ({ _id }: { _id: string }) => {

    const [message, setMessage] = useState<string>('');
    const { user } = useUser();


    const sendMessage = async (event: FormEvent) => {
        event.preventDefault();

        if (_id && message.trim()) {
            const newMessage = new FormData();
            newMessage.append('senderId', user?.userId as string);
            newMessage.append('receiverId', _id);
            newMessage.append('message', message.trim());

            try {
                await API('/chat/send', {
                    method: 'POST',
                    body: newMessage,
                });

                socket.emit('sendMessage', newMessage);
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <form onSubmit={sendMessage} className='w-10/12 mx-auto flex gap-x-2 relative z-10'>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="پیام خود را بنویسید"
                className='w-full bg-blue-50 p-3 rounded-md outline-none'
            />
            <button
                type="submit"
                className='bg-blue-300 px-4 py-2 text-white rounded-lg min-w-6 cursor-pointer'
                disabled={!message.trim()}
            >
                <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 0.75 0.75"
                    fill="none"
                    className='rotate-180'
                >
                    <path
                        d="M0.31 0.375H0.125L0.063 0.129A0.022 0.022 0 0 1 0.063 0.125c-0.001 -0.023 0.024 -0.038 0.046 -0.028L0.688 0.375 0.108 0.653c-0.021 0.01 -0.046 -0.005 -0.046 -0.027a0.022 0.022 0 0 1 0.001 -0.006L0.109 0.469"
                        stroke="#ffffff"
                        strokeWidth={0.0625}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </form>
    );
}
