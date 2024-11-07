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
        const body = Object.fromEntries(formData);

        const username = body.username as string;
        const phone = body.phone as string;
        const password = body.password as string;

        await validateRegister.validate({ username, phone, password }, { abortEarly: false });

        const existingUser = await User.findOne({
            $or: [{ phone: phone.toLowerCase() }, { username: username.toLowerCase() }],
        });

        if (existingUser) {
            return NextResponse.json({ message: 'کاربر از قبل وجود دارد' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUser = new User({
            first_name: null,
            last_name: null,
            avatar: null,
            username: username.toLowerCase(),
            phone: phone.toLowerCase(),
            password: hashedPassword,
            role: 'user',
            contacts: [],
        });

        await newUser.save();

        return NextResponse.json({ message: 'ثبت نام با موفقیت انجام شد' }, { status: 201 });

    } catch (error) {

        if (error instanceof Yup.ValidationError) {
            return NextResponse.json({ message: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'خطای سرور داخلی' }, { status: 500 });
    }
}
