import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./model/user.schema";
import {Model} from "mongoose";
import {from, Observable} from "rxjs";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    create(user: User): Observable<UserDocument> {
        return from(this.userModel.create(user));
    }

}
