export interface PasswordRecovery {
    attempt: number;
    code: number;
    user: string;
}
