import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
import * as mongoosePopulate from 'mongoose-autopopulate';

export const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    business: {
        type: Boolean,
        required: true
    },
    surname: String,
    image: String,
    address: {
        first: String,
        second: String,
        post: Number,
        state: String,
        city: String,
        country: String,
    },
    phone: Number,
    documentType: String,
    documentNumber: Number,
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Contact',
        autopopulate: true
    },
});


ContactSchema.plugin(mongoosePopulate);
