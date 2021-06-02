import {DiscountType, InvoiceDocument} from './invoice.entity';
import {ContactDocument} from '../../contact/entity/contact.entity';
import {ProductDiscount, ProductDocument} from '../../product/entity/product.entity';
import {TaxDocument} from '../../tax/entity/tax.entity';

const discount: ProductDiscount = {
    reference: 'IVA 19%',
    category: DiscountType.Percentage,
    value: 10
};

export default {

    generateInvoice(
        customer: ContactDocument,
        products: ProductDocument[],
        taxes: TaxDocument[],
        individual: boolean
    ): InvoiceDocument {
        return {
            customer: customer._id,
            products: products.map(product => ({
                reference: product._id,
                value: product.value,
                quantity: 1,
                taxes: individual ? taxes.map(tax => tax._id) : [],
                discounts: individual ? [discount] : []
            })),
            taxes: individual ? [] : taxes,
            discounts: individual ? [] : [discount]
        } as InvoiceDocument;
    }

};


