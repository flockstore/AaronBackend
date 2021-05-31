import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';

export class Tax extends Document {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    percentage: number;

}

export type TaxDocument = Tax & Document;
