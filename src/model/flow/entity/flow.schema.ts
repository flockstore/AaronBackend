import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';

export const FlowSchema = new mongoose.Schema({
    value: {type: Number, required: true},
    category: {
        type: Schema.Types.ObjectId,
        ref: 'FlowCategory',
        required: true,
        autopopulate: true
    },
    notes: {type: String, default: ''},
    payments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Transaction',
            autopopulate: true
        }
    ]
});
