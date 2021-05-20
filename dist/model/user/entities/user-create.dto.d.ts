import { UserPartial } from "./user.entity";
export declare class UserCreate extends UserPartial {
    name: string;
    surname: string;
    email: string;
    password: string;
}
