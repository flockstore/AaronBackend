import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {DiscountType} from '../../invoice/entity/invoice.entity';

export class Product extends Document {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    value: number;

}

export class ProductDiscount {
    reference: string;
    category: DiscountType;
    value: number;
}

export type ProductDocument = Product & Document;
