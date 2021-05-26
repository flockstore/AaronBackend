import {Document} from "mongoose";
import {IsNotEmpty} from "class-validator";

export class CompoundMeta {}

export class TransactionCompound {

    id: string;

    @IsNotEmpty()
    action: string;

    meta: CompoundMeta;

}

export class Transaction extends Document {

    @IsNotEmpty()
    baseValue: number;

    @IsNotEmpty()
    previousValue: number;

    @IsNotEmpty()
    exchangeValue: number;

    @IsNotEmpty()
    related: TransactionCompound;

    compound: TransactionCompound[];

}


export type TransactionDocument = Transaction & Document;
