import { MotionStyle, motion } from 'framer-motion';
import React from 'react';

interface Props {
    children: React.ReactNode;
    onclick?: () => void;
}

export const Sidebar: React.FC<Props> = ({ children, onclick }) => {
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
                {children}
            </motion.div>
        </motion.div >
    )
}
