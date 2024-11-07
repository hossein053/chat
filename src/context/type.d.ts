interface User {
    userId: string;
    first_name?: string | null;
    last_name?: string | null;
    avatar?: string | null;
    username: string;
    phone: string;
    role: 'user' | 'admin';
    token: string;
}