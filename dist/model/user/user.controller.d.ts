import { UserDocument } from "./entities/user.entity";
import { UserService } from "./user.service";
import { Observable } from "rxjs";
import { UserCreate } from "./entities/user-create.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: UserCreate): Observable<UserDocument>;
    find(id: string): Observable<UserDocument>;
    update(id: string, user: UserDocument): Observable<UserDocument>;
    delete(): void;
}
