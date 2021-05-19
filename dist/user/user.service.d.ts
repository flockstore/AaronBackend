import { User, UserDocument } from "./model/user.schema";
import { FilterQuery, Model, QueryOptions } from "mongoose";
import { Observable } from "rxjs";
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(user: User): Observable<UserDocument>;
    get(id: string): Observable<User>;
    list(query: FilterQuery<User>, options: QueryOptions): Observable<User[]>;
    update(id: string, user: User): Observable<User>;
    delete(id: string): Observable<User>;
}
