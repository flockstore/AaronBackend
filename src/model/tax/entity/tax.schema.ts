import {Schema} from 'mongoose';

export const TaxSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }
});
