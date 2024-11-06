import { ContactList } from "@/components/view/contactList";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className="grid grid-cols-12 w-full h-full">
            <div className="lg:col-span-10 md:col-span-9 md:block hidden">
                {children}
            </div>
            <div className="bg-white h-full lg:col-span-2 md:col-span-3 col-span-12">
                <ContactList />
            </div>
        </main>
    )
}