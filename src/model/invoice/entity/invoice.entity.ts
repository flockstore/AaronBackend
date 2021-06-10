import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {Contact} from '../../contact/entity/contact.entity';
import {ProductDiscount, ProductDocument} from '../../product/entity/product.entity';
import {TaxDocument} from '../../tax/entity/tax.entity';
import {PartialModel} from '../../../common/model/partial-model';

export class InvoicePartial extends PartialModel {}

export class Invoice extends InvoicePartial {

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
