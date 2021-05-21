import {Schema} from "@nestjs/mongoose";
import {UserPartial} from "./user.entity";
import {IsEmail, IsNotEmpty} from "class-validator";

@Schema()
export class UserCreate extends UserPartial {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

}
