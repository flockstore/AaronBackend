import {Document} from 'mongoose';
import {PartialModel} from "../../../common/model/partial-model";
import {Group} from "../../group/entity/group.entity";

export class User extends Document {
    name: string;
    surname: string;
    email: string;
    password: string;
    salt: string;
    groups: UserGroup[];
}

export class UserPartial extends PartialModel {}

export class UserGroup {
    group: string | Group;
    joinedAt: Date;
}

export type UserDocument = User & Document;
