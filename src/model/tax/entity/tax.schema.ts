import * as mongoose from 'mongoose';
import * as mongoosePopulate from 'mongoose-autopopulate';

export const TaxSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }
});


TaxSchema.plugin(mongoosePopulate);
