import { NextRequest, NextResponse } from 'next/server';
import { IUser, User } from '@/app/api/models/User';
import connectDB from '@/app/api/library/db';
import { Authorization } from '@/app/api/helper/authorization';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
    phone: Yup.string().required('شماره موبایل الزامی است'),
});

export async function POST(req: NextRequest) {
    await connectDB();
    const user: IUser | null | NextResponse = await Authorization(req);

    if (!user || 'status' in user) {
        return NextResponse.json({ message: 'دسترسی غیرمجاز' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const phone = formData.get('phone')?.toString() || '';

        await Schema.validate({ phone }, { abortEarly: false });

        const targetUser = await User.findOne({ phone: phone.toLowerCase() });

        if (!targetUser) {
            return NextResponse.json({ message: 'کاربر یافت نشد' }, { status: 404 });
        }

        const currentUser = await User.findById(user.id);

        if (!currentUser) {
            return NextResponse.json({ message: 'کاربر اصلی یافت نشد' }, { status: 404 });
        }

        if (currentUser.contacts.includes(targetUser._id)) {
            return NextResponse.json({ message: 'این کاربر قبلاً در لیست مخاطبین شما موجود است' }, { status: 400 });
        }

        currentUser.contacts.push(targetUser._id);
        await currentUser.save();

        return NextResponse.json({ message: 'مخاطب با موفقیت اضافه شد' }, { status: 201 });

    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            return NextResponse.json({ message: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'خطای سرور داخلی' }, { status: 500 });
    }
}
