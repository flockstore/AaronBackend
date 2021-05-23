import * as mongoose from "mongoose";
import {Schema} from "mongoose";

const validateEmail = function(email) {
    const re = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

export const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true, validate: validateEmail},
    groups: [{
        _id: false,
        group: {
            type: Schema.Types.ObjectId,
            ref: 'Group',
            required: true,
            autopopulate: true
        },
        joinedAt: {
            type: Date,
            required: true
        }
    }],
    password: {type: String, required: false},
    salt: {type: String, required: false}
});

UserSchema.plugin(require('mongoose-autopopulate'));
