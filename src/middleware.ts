import { NextRequest, NextResponse } from 'next/server';

const authPaths = ['/auth'];

export function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname;
    const cookie = request.cookies.get('token')?.value;

    let userData = null;

    if (cookie) {
        try {
            userData = JSON.parse(cookie);
        } catch (e) {
            const response = NextResponse.redirect(new URL('/auth/login', request.url));
            response.cookies.delete('token');
            return response;
        }
    }

    if (!userData) {
        if (url === '/' || !authPaths.some(path => url.startsWith(path))) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    } else {
        if (url === '/' || authPaths.some(path => url.startsWith(path))) {
            if (userData.role === 'admin') {
                return NextResponse.redirect(new URL('/admin', request.url));
            } else {
                return NextResponse.redirect(new URL('/home', request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/"
    ],
};