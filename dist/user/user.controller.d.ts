import { User, UserDocument } from "./model/user.schema";
import { UserService } from "./user.service";
import { Observable } from "rxjs";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: User): Observable<UserDocument>;
    find(): void;
    update(): void;
    delete(): void;
}
