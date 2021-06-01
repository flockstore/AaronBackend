import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';

export class Product extends Document {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    value: number;

}
export type ProductDocument = Product & Document;
