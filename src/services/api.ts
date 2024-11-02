import { deleteCookie, getCookie } from "cookies-next";

export async function API(url: string, options: RequestInit = {}) {
    const token: any = getCookie('token');

    let _user: { token: any | null } = {
        token: null
    };

    if (token) {
        let _token = JSON.parse(token);

        _user = {
            token: _token?.token
        };
    }
    try {
        const headers = {
            'authorization': `Bearer ${_user.token}`,
        };

        const response = await fetch(`http://localhost:3000/api/routes${url}`, {
            ...options,
            headers: headers,
        });

        if (response.status === 401) {
            deleteCookie('token');
            window.location.reload()
        }

        const result = await response.json();

        return result;
    } catch (error: any) {
        return { error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
}
