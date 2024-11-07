'use client'

import { SubmitButton, Text } from '@/components';
import { PasswordCheck, UserSquare } from 'iconsax-react';
import Link from 'next/link';
import { ActionApi } from '@/library/utils';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function Page() {
    const { push } = useRouter();
    const { setUserActive } = useUser()
    const handler = async (data: FormData) => {
        const response = await fetch('http://localhost:3000/api/routes/login', {
            method: 'POST',
            body: data,
        });

        const result = await response.json();
        ActionApi(result)
        if (response.status === 200) {
            setUserActive(result?.data)
            push('/home')
        }

    }
    return (
        <main className='w-full'>
            <div className='xl:w-1/3 md:w-1/2 w-11/12 bg-gray-50 mx-auto px-5 py-10 rounded-2xl'>
                <h1 className='text-black text-3xl font-semibold text-center mb-10'>ورود به چتکده</h1>
                <form action={handler} className='grid grid-cols-4 gap-7 md:w-4/5 w-full mx-auto'>
                    <Text
                        className='col-span-4 shadow-xl'
                        name='identifier'
                        title='نام کاربری یا ایمیل'
                        type='text'
                        icon={<UserSquare size={22} color="#1d4ed8" />}
                    />
                    <Text
                        className='col-span-4 shadow-xl'
                        name='password'
                        title='کلمه عبور'
                        type='password'
                        icon={<PasswordCheck size={22} color="#1d4ed8" />}
                    />
                    <Link href='/auth/register' className='col-span-4 text-blue-700'>آیا حساب کاربری ندارید؟</Link>
                    <SubmitButton
                        className='bg-blue-400 text-white font-semibold py-3 rounded-lg md:col-start-2 md:col-end-4 col-span-4 mt-14'
                        text='تایید'
                    />
                </form>
            </div>
        </main>
    );
}
