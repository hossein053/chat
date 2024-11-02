'use client'

import { getCookie } from 'cookies-next';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
    user: User | null;
    userActive: string;
    setUserActive: (x: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userActive, setUserActive] = useState<string>('');

    useEffect(() => {
        const cooke = getCookie('token');
        if (cooke) {
            setUser(JSON.parse(cooke))
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUserActive, userActive }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
