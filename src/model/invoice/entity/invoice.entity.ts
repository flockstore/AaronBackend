import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {Contact} from '../../contact/entity/contact.entity';
import {ProductDiscount, ProductDocument} from '../../product/entity/product.entity';
import {TaxDocument} from '../../tax/entity/tax.entity';

export class Invoice extends Document {

    @IsNotEmpty()
    customer: string | Contact;

    @IsNotEmpty()
    products: ProductInvoice[];

    taxes: string[] | TaxDocument[];

    discounts: ProductDiscount[];

}

export class ProductInvoice {
    reference: string | ProductDocument;
    value: number;
    quantity: number;
    taxes: string[] | TaxDocument[];
    discounts: ProductDiscount[];
}

export enum DiscountType {
    Fixed = 'Fixed', Percentage = 'Percentage', Unit = 'Unit', UnitPercentage = 'UnitPercentage'
}

export type InvoiceDocument = Invoice & Document;
