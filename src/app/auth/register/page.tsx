'use client'

import { SubmitButton, Text } from '@/components';
import { ActionApi } from '@/library/utils';
import { PasswordCheck, Sms, UserSquare } from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
    const { push } = useRouter()
    const handleSubmit = async (data: FormData) => {

        try {
            const response = await fetch('http://localhost:3000/api/routes/register', {
                method: 'POST',
                body: data,
            });

            const responseData = await response.json();
            
            if (responseData.status === 201) {
                ActionApi(responseData)
                push('/auth/login')
            }

        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <main className='w-full'>
            <div className='xl:w-1/3 md:w-1/2 w-11/12 bg-gray-50 mx-auto px-5 py-10 rounded-2xl'>
                <h1 className='text-black text-3xl font-semibold text-center mb-10'>ثبت نام در چتکده</h1>
                <form action={handleSubmit} className='grid grid-cols-4 gap-7 md:w-4/5 w-full mx-auto'>
                    <Text
                        className='col-span-4 shadow-xl'
                        name='username'
                        title='نام کاربری'
                        type='text'
                        icon={<UserSquare size={22} color="#1d4ed8" />}
                    />
                    <Text
                        className='col-span-4 shadow-xl'
                        name='email'
                        title='ایمیل'
                        type='email'
                        icon={<Sms size={22} color="#1d4ed8" />}
                    />
                    <Text
                        className='col-span-4 shadow-xl'
                        name='password'
                        title='کلمه عبور'
                        type='password'
                        icon={<PasswordCheck size={22} color="#1d4ed8" />}
                    />
                    <Link href='/auth/login' className='col-span-4 text-blue-700'>آیا حساب کاربری دارید؟</Link>
                    <SubmitButton className='bg-blue-400 text-white font-semibold py-3 rounded-lg md:col-start-2 md:col-end-4 col-span-4 mt-14' text='تایید' />
                </form>
            </div>
        </main>
    );
}
