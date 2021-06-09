import {Schema} from 'mongoose';

export const ContactSchema = new Schema({
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
