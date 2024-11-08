'use client'
import { AddContact } from "@/components/view/addContact";
import { ContactList } from "@/components/view/contactList";
import { AnimatePresence } from "framer-motion";
import { UserCirlceAdd } from "iconsax-react";
import React, { useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(false)
    return (
        <main className="grid grid-cols-12 w-full h-full relative">
            <div className="lg:col-span-10 md:col-span-9 md:block hidden window-chat">
                {children}
            </div>
            <div className="bg-white dark:bg-dark-background h-full lg:col-span-2 md:col-span-3 col-span-12">
                <ContactList />
            </div>
            <div className='bg-blue-400 text-white w-14 h-14 absolute z-10 bottom-5 left-5 rounded-full row cursor-pointer' onClick={() => setShow(!show)}>
                <UserCirlceAdd size={30} color="#FFF" />
            </div>
            <AnimatePresence>
                {show &&
                    <AddContact onclick={() => setShow(!show)} />
                }
            </AnimatePresence>
        </main>
    )
}