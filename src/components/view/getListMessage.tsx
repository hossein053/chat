'use client';

import { useUser } from '@/context/UserContext';
import { API } from '@/services/api';
import classNames from 'classnames';
import React from 'react';
import io from 'socket.io-client';

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
}

interface Message {
    _id: string;
    sender: User;
    receiver: User;
    message: string;
    createdAt: string;
    __v: number;
}

interface MessagesResponse {
    messages: Message[];
}

export const socket = io();

export const GetListMessage = ({ _id }: { _id: string }) => {
    const { setUserActive, userActive } = useUser()
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        setUserActive(_id)
    }, [_id, setUserActive])

    React.useEffect(() => {
        if (_id) {
            const fetchMessages = async () => {
                try {
                    const response: MessagesResponse = await API(`/chat/${_id}`);
                    setMessages(response?.messages);
                } catch (err) {

                } finally {
                    setLoading(false);
                }
            };

            fetchMessages();

            socket.on('receiveMessage', (newMessage: Message) => {
                fetchMessages()
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                socket.off('receiveMessage');
            };
        }
    }, [_id]);

    if (loading) return <div>Loading messages...</div>;

    return (
        <div className='w-10/12 mx-auto overflow-hidden h-full relative z-10'>
            {messages?.length
                ?
                <div className='overflow-y-scroll h-full w-full no-scrollbar'>
                    {messages?.map((msg, i) => (
                        <div key={i} className={classNames('my-2', {
                            'text-end': _id === msg?.receiver?._id
                        })}>
                            <div className='inline-block w-auto bg-green-50 py-2 px-4 rounded-3xl'>
                                {msg.message}
                            </div>
                        </div>
                    ))
                    }
                </div>
                :
                <div className='h-full w-full flex justify-center items-center'>
                    <div className='bg-white p-3 rounded-xl'>
                        <p className='text-center'>هنوز پیامی در اینجا وجود ندارد...</p>
                        <p className='text-center'>پیامی ارسال کنید</p>
                    </div>
                </div>
            }
        </div>
    );
};
