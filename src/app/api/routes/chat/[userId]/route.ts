import Message, { IMessage } from '@/app/api/models/Message';
import dbConnect from '@/app/api/library/db';
import { NextRequest, NextResponse } from 'next/server';
import { Authorization } from '@/app/api/helper/authorization';
import { IUser } from '@/app/api/models/User';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    await dbConnect();
    const { userId } = params; 

    const user: IUser | null | NextResponse = await Authorization(req);


    if (!user || 'status' in user) {
        return NextResponse.json({ message: 'دسترسی غیرمجاز' }, { status: 401 });
    }

    if (!userId) {
        return NextResponse.json({ message: 'شناسه کاربری وجود ندارد' }, { status: 400 });
    }

    try {

        const messages: IMessage[] = await Message.find({
            $or: [
                { sender: user._id, receiver: userId },
                { sender: userId, receiver: user._id },
            ],
        }).populate('sender receiver');

        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'خطا در بازیابی پیام ها' }, { status: 500 });
    }
}
