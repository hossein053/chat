import dbConnect from '@/app/api/library/db';
import Message from '@/app/api/models/Message';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const formData = await request.formData();
        const senderId = formData.get('senderId')?.toString() || '';
        const receiverId = formData.get('receiverId')?.toString() || '';
        const message = formData.get('message')?.toString() || '';

        if (!senderId || !receiverId || !message) {
            return NextResponse.json({ error: 'داده نامعتبر' }, { status: 400 });
        }
        
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            message,
            createdAt: new Date(),
        });

        await newMessage.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'پیام ارسال نشد' }, { status: 500 });
    }
}
