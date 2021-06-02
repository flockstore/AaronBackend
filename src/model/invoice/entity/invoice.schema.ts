import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
import * as mongoosePopulate from 'mongoose-autopopulate';

function getDiscount() {
    return {
        reference: String,
        category: {
            type: String,
            enum: ['Fixed', 'Percentage', 'Unit', 'UnitPercentage']
        },
        value: Number
    };
}

export const InvoiceSchema = new mongoose.Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Contact',
        autopopulate: true
    },
    products: {
        reference: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            autopopulate: true
        },
        value: Number,
        quantity: Number,
        taxes: [{
            type: Schema.Types.ObjectId,
            ref: 'Tax',
            autopopulate: true
        }],
        discounts: [
            getDiscount()
        ]
    },
    taxes: [{
        type: Schema.Types.ObjectId,
        ref: 'Tax',
        autopopulate: true
    }],
    discounts: [getDiscount()]
});

InvoiceSchema.plugin(mongoosePopulate);
