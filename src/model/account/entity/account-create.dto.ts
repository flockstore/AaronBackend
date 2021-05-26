import {Account} from "./account.entity";
import {IsNotEmpty} from "class-validator";

export class AccountCreate extends Account {

    @IsNotEmpty()
    initialValue: string;

}
