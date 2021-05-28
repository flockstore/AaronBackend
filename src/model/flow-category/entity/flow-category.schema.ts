import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';

export const FlowCategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    income: {type: Boolean, default: true},
    description: {type: String, default: ''},
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'FlowCategory',
        required: false,
        autopopulate: true
    },
});
