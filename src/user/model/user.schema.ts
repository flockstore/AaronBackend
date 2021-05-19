import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {isEmail, IsEmail, IsNotEmpty} from "class-validator";

export type UserDocument = User & Document;

const validateEmail = function(email) {
    const re = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

@Schema()
export class User {

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

export const UserSchema = SchemaFactory.createForClass(User);
