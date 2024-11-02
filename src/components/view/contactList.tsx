'use client'

import { useUser } from '@/context/UserContext';
import { API } from '@/services/api';
import classNames from 'classnames';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Contact {
    _id: string;
    username: string;
}

export const ContactList = () => {
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

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-3">
            {contacts?.map((contact,i) => user?.userId !== contact._id && (
                <div
                    className={classNames("overflow-hidden text-center py-3 font-semibold text-lg border-b-2 border-b-black mt-2 rounded-lg cursor-pointer hover:text-white hover:bg-blue-400", {
                        'bg-blue-400 text-white': userActive === contact._id
                    })}
                    key={i}
                    onClick={()=>setUserActive(contact._id)}
                >
                    <Link href={`/home/${contact._id}`}>
                        {contact.username}
                    </Link>
                </div>
            ))}
        </div>
    );
};
