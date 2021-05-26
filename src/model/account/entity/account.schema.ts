import * as mongoose from "mongoose";

export const AccountSchema = new mongoose.Schema({
    name: {type: String, required: true},
    number: {type: Number, required: true},
    bank: {type: String, required: true},
    image: {type: String, default: false}
});
