import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./model/user.schema";
import {FilterQuery, Model, QueryOptions} from "mongoose";
import {from, Observable} from "rxjs";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    create(user: User): Observable<UserDocument> {
        return from(this.userModel.create(user));
    }

    get(id: string): Observable<User> {
        return from(this.userModel.findById(id));
    }

    list(query: FilterQuery<User>, options: QueryOptions): Observable<User[]> {
        return from(this.userModel.find(query || {}, options || {}));
    }

    update(id: string, user: User): Observable<User> {
        return from(this.userModel.findByIdAndUpdate(id, user));
    }

    delete(id: string): Observable<User> {
        return from(this.userModel.findByIdAndDelete(id));
    }

}
