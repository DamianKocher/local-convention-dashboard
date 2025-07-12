const TOKEN_ID = 'local_convention:token';

export function clearToken() {
    localStorage.removeItem(TOKEN_ID);
}

export function stashToken(token: string) {
    return localStorage.setItem(TOKEN_ID, token);
}

export function loadToken() {
    return localStorage.getItem(TOKEN_ID);
}