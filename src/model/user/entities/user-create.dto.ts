import {Schema} from "@nestjs/mongoose";
import {UserPartial} from "./user.entity";

@Schema()
export class UserCreate extends UserPartial {

    name: string;

    surname: string;

    email: string;

    password: string;

}
