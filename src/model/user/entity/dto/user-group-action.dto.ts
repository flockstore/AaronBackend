import {IsNotEmpty} from "class-validator";

export class UserGroupAction {

    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    group: string;

}
