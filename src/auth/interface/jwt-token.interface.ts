export interface JwtToken<T> {
    data: T;
    exp: number;
    iat: number;
}
