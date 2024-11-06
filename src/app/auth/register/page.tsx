'use client'

import { SubmitButton, Text } from '@/components';
import { ActionApi } from '@/library/utils';
import { Call, PasswordCheck, UserSquare } from 'iconsax-react';
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
            } else {
                ActionApi(responseData)
            }

        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <main className='w-full'>
            <div className='xl:w-1/3 md:w-1/2 w-11/12 bg-gray-50 mx-auto md:p-10 p-5 rounded-2xl'>
                <form action={handleSubmit} className='grid grid-cols-4 gap-5 w-full mx-auto'>
                    <Text
                        className='md:col-span-2 col-span-4 shadow-xl'
                        name='username'
                        title='نام کاربری'
                        type='text'
                        icon={<UserSquare size={22} color="#1d4ed8" />}
                    />
                    <Text
                        className='md:col-span-2 col-span-4 shadow-xl'
                        name='phone'
                        title='تلفن'
                        type='tel'
                        icon={<Call size={22} color="#1d4ed8" />}
                        dir='rtl'
                    />
                    <Text
                        className='col-span-4 shadow-xl'
                        name='password'
                        title='کلمه عبور'
                        type='password'
                        icon={<PasswordCheck size={22} color="#1d4ed8" />}
                    />
                    <Link href='/auth/login' className='col-span-4 text-blue-700'>آیا حساب کاربری دارید؟</Link>
                    <SubmitButton className='bg-blue-400 text-white font-semibold py-3 rounded-lg md:col-start-2 md:col-end-4 col-span-4' text='ثبت نام' />
                </form>
            </div>
        </main>
    );
}
