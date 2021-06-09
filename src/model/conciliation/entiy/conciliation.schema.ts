import {Schema} from 'mongoose';

export const ConciliationSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        autopopulate: true
    },
    value: {
        type: Number,
        required: true
    },
    authorized: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
});
