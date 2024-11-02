import { ContactList } from "@/components/view/contactList";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className="grid grid-cols-12 w-full h-full">
            {children}
            <div className="bg-white h-full col-span-2">
                <ContactList />
            </div>
        </main>
    )
}