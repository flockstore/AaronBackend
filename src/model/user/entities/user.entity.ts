import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {IsEmail, IsNotEmpty} from "class-validator";
import {PartialModel} from "../../../common/model/partial-model";

export type UserDocument = User & Document;

const validateEmail = function(email) {
    const re = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

@Schema()
export class User extends Document {

    @IsNotEmpty()
    @Prop({required: true})
    name: string;

    @IsNotEmpty()
    @Prop({required: true})
    surname: string;

    @IsEmail()
    @Prop({required: true, unique: true, validate: validateEmail})
    email: string;

    @IsNotEmpty()
    @Prop({required: true})
    password: string;

}

export class UserPartial extends PartialModel {}

export const UserSchema = SchemaFactory.createForClass(User);
