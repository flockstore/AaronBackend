import {Schema} from 'mongoose';

function getCompound() {
    return {
        id: {
            type: Schema.Types.ObjectId,
            required: false
        },
        action: {
            type: String,
            required: false
        },
        meta: {
            type: Schema.Types.Mixed,
            required: false
        }
    };
}

export const TransactionSchema = new Schema({
    baseValue: {type: Number, required: true},
    previousValue: {type: Number, required: true},
    exchangeValue: {type: Number, required: true},
    addition: {type: Boolean, default: true},
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        autopopulate: true
    },
    related: getCompound(),
    compound: [getCompound()]
});
