import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {PartialModel} from "../../../common/model/partial-model";

export type UserDocument = User & Document;

const validateEmail = function(email) {
    const re = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

@Schema()
export class User extends Document {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    surname: string;

    @Prop({required: true, unique: true, validate: validateEmail})
    email: string;

    @Prop({required: false})
    password: string;

    @Prop({required: false})
    salt: string;

}

export class UserPartial extends PartialModel {}

export const UserSchema = SchemaFactory.createForClass(User);
