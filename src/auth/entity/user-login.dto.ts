import {IsNotEmpty} from 'class-validator';

export class UserLoginDto {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

}

export class RecoveryDto {
    @IsNotEmpty()
    email: string;
}

export class ValidateRecoveryDto {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    code: number;

}

export class PasswordUpdateDto {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    code: number;

    @IsNotEmpty()
    password: string;

}

