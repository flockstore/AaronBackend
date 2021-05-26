import {Document} from "mongoose";
import {IsNotEmpty} from "class-validator";

export class Account extends Document {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    number: number;

    @IsNotEmpty()
    bank: string;

    image: string;

}

export type AccountDocument = Account & Document;
