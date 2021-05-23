import {UserGroup, UserPartial} from "./user.entity";
import {IsEmail, IsNotEmpty} from "class-validator";

export class UserCreate extends UserPartial {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    groups: UserGroup[];

}
