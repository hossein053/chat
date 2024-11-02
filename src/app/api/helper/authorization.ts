import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/User';
import dbConnect from '../library/db';


const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function Authorization(req: NextRequest): Promise<NextResponse | IUser | null> {
    await dbConnect();

    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: 'Authorization header is missing or invalid' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        if (!decoded || !decoded.userId) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        const user: IUser | null = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return user;
    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}
