import {Schema} from 'mongoose';

export const FlowCategorySchema = new Schema({
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
