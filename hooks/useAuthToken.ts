'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useAuthToken(): { token: string | null; hasToken: boolean | null } {
    const [token, setToken] = useState<string | null>(null);
    const [hasToken, setHasToken] = useState<boolean | null>(null);

    useEffect(() => {
        const tokenValue = Cookies.get('token') || null;
        setToken(tokenValue);
        setHasToken(!!tokenValue);
    }, []);

    return { token, hasToken };
}
