'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useAuthToken(): { token: string; hasToken: boolean } {
    const [token, setToken] = useState<string>("");
    const [hasToken, setHasToken] = useState<boolean>(false);

    useEffect(() => {
        const tokenValue = Cookies.get('token') || "";
        setToken(tokenValue);
        setHasToken(!!tokenValue);
    }, []);

    return { token, hasToken };
}
