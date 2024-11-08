'use client'

import React from 'react'
import { motion } from 'framer-motion';
import { SubmitButton, Text } from '../common';
import { Call } from 'iconsax-react';
import { ActionApi } from '@/library/utils';
import { API } from '@/services/api';

interface Props {
    onclick?: () => void;
}

export const AddContact: React.FC<Props> = ({ onclick }) => {

    const handleSubmit = async (data: FormData) => {

        try {
            const response = await API('/contact/add', {
                method: 'POST',
                body: data,
            });
            ActionApi(response)

        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <motion.div
            className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 overflow-hidden z-20 row'
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
                className='h-auto bg-background dark:bg-dark-background p-5 rounded-lg md:w-1/3'
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <form action={handleSubmit}>
                    <p className='pb-5 text-base text-center'>افزودن مخاطب</p>
                    <Text
                        title='شماره تلفن'
                        name='phone'
                        icon={<Call size={22} color="#394a6c" />}
                        className='border-2'
                    />
                    <div className='w-full row'>
                        <SubmitButton text='افزودن' className='bg-primary text-white px-16 py-2.5 rounded-lg mt-5' />
                    </div>
                </form>
            </motion.div>
        </motion.div>
    )
}
