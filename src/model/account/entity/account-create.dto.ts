import {AccountPartial} from "./account.entity";
import {IsNotEmpty} from "class-validator";

export class AccountCreate extends AccountPartial {

    @IsNotEmpty()
    initialValue: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    number: number;

    @IsNotEmpty()
    bank: string;

    image: string;

}
