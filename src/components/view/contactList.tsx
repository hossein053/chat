'use client'

import { useUser } from '@/context/UserContext';
import { API } from '@/services/api';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { HambergerMenu } from 'iconsax-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';

import { useTheme } from '@/hooks/useTheme';
interface Contact {
    _id: string;
    username: string;
}

export const ContactList = () => {
    const { theme } = useTheme()
    const [showSidebar, setShowSidebar] = useState(false)
    const { user, setUserActive, userActive } = useUser()
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await API('/users');
                setContacts(response)
            } catch (error) {
                console.error('Error fetching contacts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className='h-full relative'>
            <div className="w-full flex items-center p-3 gap-x-3">
                <input
                    type="text"
                    className="py-2 px-4 bg-gray-200 w-full rounded-3xl outline-none"
                    placeholder="جستجو ..."
                />
                <HambergerMenu
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="min-w-[35px] cursor-pointer"
                    size={35}
                    color={theme === 'dark' ? "#D5D4DF" : '#394A6C'}
                />
            </div>
            <div className="p-3 h-[calc(100vh-64px)] overflow-y-scroll no-scrollbar">
                {loading
                    ?
                    <div className='h-full row'>
                        <p className='text-sm font-semibold text-gray-400'>در حال پردازش ...</p>
                    </div>
                    :
                    contacts?.map((contact: any, i) => user?.userId !== contact?._id && (
                        <div
                            className={classNames("overflow-hidden text-center py-3 font-semibold text-lg border-b-2 border-b-black mt-2 rounded-lg cursor-pointer hover:text-white hover:bg-blue-400", {
                                'bg-blue-400 text-white': userActive === contact?._id
                            })}
                            key={i}
                            onClick={() => setUserActive(contact?._id)}
                        >
                            <Link href={`/home/${contact?._id}`}>
                                {contact?.username}
                            </Link>
                        </div>
                    ))}
            </div>
            <AnimatePresence>
                {showSidebar &&
                    <Sidebar onclick={() => setShowSidebar(!showSidebar)}/>
                }
            </AnimatePresence>
        </div>
    );
};
