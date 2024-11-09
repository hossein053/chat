
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import '@/assets/styles/styles.scss'
import { UserProvider } from '@/context/UserContext';
import { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
    title: 'Chatkadeh',
    description: 'A space for communication',
    icons: [
        { url: '/icons-logo.webp' }
    ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="fa-IR" dir='rtl'>
            <body suppressHydrationWarning={true}>
                <Providers>
                    <UserProvider>
                        {children}
                        <ToastContainer
                            position='top-center'
                            className='text-sm font-medium'
                            autoClose={2000}
                            toastClassName={'custom-toast'}
                        />
                    </UserProvider>
                </Providers>
            </body>
        </html>
    )
}