import { User, UserDocument } from "./model/user.schema";
import { Model } from "mongoose";
import { Observable } from "rxjs";
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(user: User): Observable<UserDocument>;
}
