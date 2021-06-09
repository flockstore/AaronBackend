import {Schema} from 'mongoose';

export const AccountSchema = new Schema({
    name: {type: String, required: true},
    number: {type: Number, required: true},
    bank: {type: String, required: true},
    image: {type: String, default: false}
});
