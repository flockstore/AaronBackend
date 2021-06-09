import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {Observable, throwError} from 'rxjs';
import {UserDocument} from '../model/user/entity/user.entity';
import {UserService} from '../model/user/user.service';
import {PasswordSerializer} from './serializer/password.serializer';
import {map, mergeMap} from 'rxjs/operators';
import {TokenSerializer} from './serializer/token.serializer';
import {MailService} from '../provider/mail/service/mail.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private passwordSerializer: PasswordSerializer,
        private tokenSerializer: TokenSerializer,
        private mailService: MailService
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
                    map(processedPassword => {
                        if (!processedPassword) {
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
                this.userService.update(id, {password: compound.hash, salt: compound.salt.toString()} as any).pipe()
            )
        );
    }

    /**
     * Send an email to a registered user in order to recover a password.
     * @param email       to recover.
     */
    public recovery(email: string): Observable<void> {
        return this.userService.list({email}).pipe(
            mergeMap(users => {

                if (users.length < 1) {
                    throwError(new NotFoundException('User with email not found'));
                }

                const user: UserDocument = users[0];

                return this.mailService.sendMail(
                    'recovery',
                    user.email,
                    'Password Recovery',
                    user
                );

            })
        );
    }

    private findMatchUser(email: string): Observable<UserDocument> {
        return this.userService.list({email, password: {$exists: true}}).pipe(
            map(user => {
                if (user.length === 0) {
                    throwError(new NotFoundException());
                }
                return user[0];
            })
        );
    }

}
