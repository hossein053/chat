'use client'

import { useUser } from '@/context/UserContext';
import { API } from '@/services/api';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ArchiveAdd, HambergerMenu, Moon, Setting2 } from 'iconsax-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import Image from 'next/image';
import { ThemeSwitch } from './themeSwitch';
import defalt_profile from '@/assets/images/gold-user.png'
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
                    <Sidebar onclick={() => setShowSidebar(!showSidebar)}>
                        <div className='flex flex-col p-3'>
                            <div className='flex flex-col justify-center items-center w-full border-b-2 pb-3'>
                                <Image
                                    alt='profile'
                                    src={defalt_profile}
                                    width={75}
                                    height={75}
                                    className='rounded-full'
                                />
                                <p className='pt-2 text-base font-medium'>{user?.username}</p>
                                <p className='pt-2 text-base font-medium'>{user?.phone}</p>
                            </div>
                            <div className='flex items-end flex-col pt-3'>
                                <Link href={'/home/' + user?.userId}>
                                    <div className='row-end gap-x-2 py-2 w-full cursor-pointer'>
                                        <p className='text-base font-medium'>پیام های ذخیره شده</p>
                                        <ArchiveAdd size={22} color={theme === 'dark' ? "#D5D4DF" : '#394A6C'} />
                                    </div>
                                </Link>
                                <div className='row-end gap-x-2 py-2 w-full cursor-pointer'>
                                    <p className='text-base font-medium'>تنظیمات</p>
                                    <Setting2 size={22} color={theme === 'dark' ? "#D5D4DF" : '#394A6C'} />
                                </div>
                                <div className='row-between gap-x-2 py-2 w-full cursor-pointer'>
                                    <ThemeSwitch />
                                    <div className='row-end gap-x-2'>
                                        <p className='text-base font-medium'>حالت شب</p>
                                        <Moon size={22} color={theme === 'dark' ? "#D5D4DF" : '#394A6C'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Sidebar>
                }
            </AnimatePresence>
        </div>
    );
};
