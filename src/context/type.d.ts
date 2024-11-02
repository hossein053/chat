interface User {
    userId: string;
    email: string;
    role: 'user' | 'admin';
    username: string;
    token: string;
}