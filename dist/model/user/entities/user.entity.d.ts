import { Document } from 'mongoose';
import { PartialModel } from "../../../common/model/partial-model";
export declare type UserDocument = User & Document;
export declare class User extends Document {
    name: string;
    surname: string;
    email: string;
    password: string;
}
export declare class UserPartial extends PartialModel {
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<any, any, any>, undefined>;
