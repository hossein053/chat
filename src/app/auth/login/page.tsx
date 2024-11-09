'use client'

import { SubmitButton, Text } from '@/components';
import { PasswordCheck, UserSquare } from 'iconsax-react';
import Link from 'next/link';
import { ActionApi } from '@/library/utils';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { OrganizeImage } from '@/components/common/image';
import chat from "@/assets/images/chat.webp";

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
            <div className='xl:w-1/3 md:w-1/2 w-11/12 bg-gray-50 mx-auto md:px-10 md:pb-10 pb-5 px-5 rounded-2xl'>
                <OrganizeImage
                    alt='logo'
                    height={150}
                    src={chat}
                    width={150}
                    className='mx-auto'
                />
                <form action={handler} className='grid grid-cols-4 gap-5 md:w-4/5 w-full mx-auto'>
                    <Text
                        className='col-span-4 shadow-xl'
                        name='identifier'
                        title='نام کاربری یا ایمیل'
                        type='text'
                        icon={<UserSquare size={22} color="#394a6c" />}
                    />
                    <Text
                        className='col-span-4 shadow-xl'
                        name='password'
                        title='کلمه عبور'
                        type='password'
                        icon={<PasswordCheck size={22} color="#394a6c" />}
                    />
                    <div className='md:col-span-2 col-span-4'>
                        <Link href='/auth/register'>
                            <button className='bg-primary-200 text-white font-semibold h-10 rounded-lg w-full'>
                                ثبت نام
                            </button>
                        </Link>
                    </div>
                    <SubmitButton
                        className='bg-primary-100 text-white font-semibold h-10 rounded-lg md:col-span-2 col-span-4'
                        text='ورود'
                    />
                </form>
            </div>
        </main>
    );
}
