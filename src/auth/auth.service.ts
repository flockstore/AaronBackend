import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {Observable, throwError} from "rxjs";
import {UserDocument} from "../model/user/entity/user.entity";
import {UserService} from "../model/user/user.service";
import {PasswordSerializer} from "./serializer/password.serializer";
import {map, mergeMap} from "rxjs/operators";
import {TokenSerializer} from "./serializer/token.serializer";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private passwordSerializer: PasswordSerializer,
        private tokenSerializer: TokenSerializer
    ) {}

    /**
     * Login an user with an email and a password.
     * @param email        to verify
     * @param password     to match
     */
    public login(email: string, password: string): Observable<string> {
        return this.findMatchUser(email).pipe(
            mergeMap(selectedUser =>
                this.passwordSerializer.validate(selectedUser.password, password).pipe(
                    map(password => {
                        if (!password) {
                            throwError(new UnauthorizedException('Invalid Password'));
                        }
                        return this.tokenSerializer.encryptPayload<any>({_id: selectedUser._id});
                    })
                )
            )
        );
    }

    /**
     * Register a password for an user in order to allow future access.
     * @param id           of user where password will be assigned.
     * @param password     of the user to assign.
     */
    public register(id: string, password: string): Observable<UserDocument> {
        return this.passwordSerializer.serialize(password).pipe(
            mergeMap(compound =>
                this.userService.update(id, {password: compound.hash, salt: compound.salt.toString()}).pipe()
            )
        );
    }

    private findMatchUser(email: string): Observable<UserDocument> {
        return this.userService.list({email, password: {$exists: true}}).pipe(
            map(user => {
                if (user.length == 0) {
                    throwError(new NotFoundException());
                }
                return user[0];
            })
        );
    }

}
