import { NextRequest, NextResponse } from 'next/server';
import { IUser, User } from '@/app/api/models/User';
import connectDB from '@/app/api/library/db';
import { Authorization } from '@/app/api/helper/authorization';

export async function GET(req: NextRequest) {
    await connectDB();

    const session: IUser | null | NextResponse = await Authorization(req);

    if (!session || 'status' in session) {
        return NextResponse.json({ message: 'دسترسی غیرمجاز' }, { status: 401 });
    }

    try {

        const user = await User.findOne({ phone: session.phone }).populate('contacts', 'username phone id avatar');

        if (!user) {
            return NextResponse.json({ message: 'کاربر یافت نشد' }, { status: 404 });
        }

        return NextResponse.json({ contacts: user.contacts }, { status: 200 });

    } catch (error) {

        return NextResponse.json({ message: 'خطای سرور داخلی' }, { status: 500 });
    }
}
