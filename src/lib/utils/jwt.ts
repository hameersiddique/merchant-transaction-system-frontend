
export function decodeJWT(token: string): { exp?: number;[key: string]: any } | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            return null;
        }

        const payload = parts[1];
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

        return decoded;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}


export function getTokenMaxAge(token: string): number | null {
    const decoded = decodeJWT(token);

    if (!decoded || !decoded.exp) {
        return null;
    }

    // exp is in seconds, calculate remaining time
    const now = Math.floor(Date.now() / 1000);
    const maxAge = decoded.exp - now;

    // Return positive value or 0 if already expired
    return Math.max(0, maxAge);
}


export function setCookie(name: string, value: string, maxAge: number) {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}


export function deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}