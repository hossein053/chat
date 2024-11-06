import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser, User } from '@/app/api/models/User';
import * as Yup from 'yup';
import connectDB from '@/app/api/library/db';

const loginSchema = Yup.object().shape({
    identifier: Yup.string().required('نام کاربری یا شماره موبایل الزامی است'),
    password: Yup.string().required('کلمه عبور الزامی است'),
});

const JWT_SECRET = 'your_secret_key';

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const formData = await req.formData();
        const identifier = formData.get('identifier')?.toString() || '';
        const password = formData.get('password')?.toString() || '';

        await loginSchema.validate({ identifier, password }, { abortEarly: false });

        const user: IUser | null = await User.findOne({
            $or: [{ phone: identifier.toLowerCase() }, { username: identifier.toLowerCase() }],
        });

        if (!user) {
            return NextResponse.json({ message: 'نام کاربری یا رمز عبور نادرست است' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'کلمه عبور نادرست است' }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return NextResponse.json({
            message: 'ورود موفقیت‌آمیز بود',
            data: {
                userId: user._id,
                token,
                first_name: user.first_name,
                last_name: user.last_name,
                avatar: user.avatar,
                username: user.username,
                phone: user.phone,
                created_at: user.createdAt,
                role: user.role,
            }
        }, { status: 200 });

    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            return NextResponse.json({ message: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'خطای سرور داخلی' }, { status: 500 });
    }
}
