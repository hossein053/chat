'use client'

import { motion } from 'framer-motion';
import { ArchiveAdd, Moon, Setting2 } from 'iconsax-react';
import Link from 'next/link';
import React from 'react';
import { ThemeSwitch } from './themeSwitch';
import { useTheme } from '@/hooks/useTheme';
import { useUser } from '@/context/UserContext';
import defalt_profile from '@/assets/images/gold-user.png'
import { OrganizeImage } from '../common/image';

interface Props {
    onclick?: () => void;
}

export const Sidebar: React.FC<Props> = ({ onclick }) => {
    const { theme } = useTheme()
    const { user, setUserActive, userActive } = useUser()
    return (
        <motion.div
            className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 grid grid-cols-12 ltr overflow-hidden z-20'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    if (onclick) {
                        onclick()
                    }
                }
            }}
        >
            <motion.div
                className='lg:col-span-2 md:col-span-3 col-span-12 h-full bg-white dark:bg-dark-background'
                initial={{ x: "-100%" }}
                animate={{ x: "0" }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3 }}
            >
                <div className='flex flex-col p-3'>
                    <div className='flex flex-col justify-center items-center w-full border-b-2 pb-3'>
                        <OrganizeImage
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
                        <Link href={'/home/setting'}>
                            <div className='row-end gap-x-2 py-2 w-full cursor-pointer'>
                                <p className='text-base font-medium'>تنظیمات</p>
                                <Setting2 size={22} color={theme === 'dark' ? "#D5D4DF" : '#394A6C'} />
                            </div>
                        </Link>
                        <div className='row-between gap-x-2 py-2 w-full cursor-pointer'>
                            <ThemeSwitch />
                            <div className='row-end gap-x-2'>
                                <p className='text-base font-medium'>حالت شب</p>
                                <Moon size={22} color={theme === 'dark' ? "#D5D4DF" : '#394A6C'} />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div >
    )
}
