import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { IUser, User } from '@/app/api/models/User';
import * as Yup from 'yup';
import connectDB from '@/app/api/library/db';
import { validateRegister } from '@/app/api/validations/register';


export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const formData = await req.formData();
        const username = formData.get('username')?.toString() || '';
        const email = formData.get('email')?.toString() || '';
        const password = formData.get('password')?.toString() || '';

        await validateRegister.validate({ username, email, password }, { abortEarly: false });

        const existingUser = await User.findOne({
            $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
        });

        if (existingUser) {
            return NextResponse.json({ message: 'کاربر از قبل وجود دارد' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUser = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
            role: 'user',
        });

        await newUser.save();

        return NextResponse.json({ message: 'ثبت نام با موفقیت انجام شد', status: 201 }, { status: 201 });

    } catch (error) {

        if (error instanceof Yup.ValidationError) {
            return NextResponse.json({ message: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'خطای سرور داخلی' }, { status: 500 });
    }
}
