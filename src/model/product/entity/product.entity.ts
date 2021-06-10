import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {DiscountType} from '../../invoice/entity/invoice.entity';
import {PartialModel} from '../../../common/model/partial-model';

export class ProductPartial extends PartialModel {}

export class Product extends ProductPartial {

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
