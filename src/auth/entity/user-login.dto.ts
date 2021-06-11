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
