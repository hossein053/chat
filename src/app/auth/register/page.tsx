'use client'

import { SubmitButton, Text } from '@/components';
import { OrganizeImage } from '@/components/common/image';
import { ActionApi } from '@/library/utils';
import { Call, PasswordCheck, UserSquare } from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import chat from "@/assets/images/chat.webp";

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
            <div className='xl:w-1/3 md:w-1/2 w-11/12 bg-gray-50 mx-auto md:px-10 md:pb-10 pb-5 px-5 rounded-2xl'>
                <OrganizeImage
                    alt='logo'
                    height={150}
                    src={chat}
                    width={150}
                    className='mx-auto'
                />
                <form action={handleSubmit} className='grid grid-cols-4 gap-5 w-full mx-auto'>
                    <Text
                        className='md:col-span-2 col-span-4 shadow-xl'
                        name='username'
                        title='نام کاربری'
                        type='text'
                        icon={<UserSquare size={22} color="#394a6c" />}
                    />
                    <Text
                        className='md:col-span-2 col-span-4 shadow-xl'
                        name='phone'
                        title='تلفن'
                        type='tel'
                        icon={<Call size={22} color="#394a6c" />}
                        dir='rtl'
                    />
                    <Text
                        className='col-span-4 shadow-xl'
                        name='password'
                        title='کلمه عبور'
                        type='password'
                        icon={<PasswordCheck size={22} color="#394a6c" />}
                    />
                    <div className='md:col-span-2 col-span-4'>
                        <Link href='/auth/login'>
                            <button className='bg-primary-200 text-white font-semibold h-10 rounded-lg w-full'>
                                ورود
                            </button>
                        </Link>
                    </div>
                    <SubmitButton
                        className='bg-primary-100 text-white font-semibold h-10 rounded-lg md:col-span-2 col-span-4'
                        text='ثبت نام'
                    />
                </form>
            </div>
        </main>
    );
}
