import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
import * as mongoosePopulate from 'mongoose-autopopulate';

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


FlowCategorySchema.plugin(mongoosePopulate);
