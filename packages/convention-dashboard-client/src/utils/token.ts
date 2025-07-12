export function parseToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
}