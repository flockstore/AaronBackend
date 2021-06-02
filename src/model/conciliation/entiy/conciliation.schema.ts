import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
import * as mongoosePopulate from 'mongoose-autopopulate';

export const ConciliationSchema = new mongoose.Schema({
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


ConciliationSchema.plugin(mongoosePopulate);
