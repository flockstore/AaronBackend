import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {UserService} from '../model/user/user.service';
import {CacheService} from '../provider/cache/cache.service';
import {MailService} from '../provider/mail/mail.service';
import {UserDocument} from '../model/user/entity/user.entity';
import {PasswordRecovery} from './interface/password-recovery.interface';
import {AuthService} from './auth.service';

@Injectable()
export class RecoveryService {

    constructor(
        private userService: UserService,
        private cacheService: CacheService,
        private mailService: MailService,
        private authService: AuthService
    ) {}

    public sendRecovery(email: string): Observable<any> {
        return this.findMatchUser(email).pipe(
            mergeMap(user =>
                this.getActualAttempt(user._id).pipe(
                    map(previousAttempt => ({attempts: previousAttempt, user}))
                )
            ),
            map(compound => {

                if (compound.attempts && compound.attempts.attempt > 2) {
                    throw new BadRequestException('Max recovery attempts reached');
                }

                const recovery: PasswordRecovery =  {
                    attempt: compound.attempts ? compound.attempts.attempt + 1 : 1,
                    code: Math.floor(1000 + Math.random() * 9000),
                    user: compound.user._id
                };

                return {recovery, user: compound.user};
            }),
            mergeMap(compound =>
                this.cacheService.setKey('recovery:' + compound.recovery.user, compound.recovery, {ttl: 600}).pipe(
                    map(() => compound)
                )
            ),
            mergeMap(compound =>
                    this.mailService.sendMail(
                        './recovery',
                        compound.user.email,
                        'Password Recovery',
                        ['forgot.png', 'martina.png'],
                        {code: compound.recovery.code, name: compound.user.name, year: new Date().getFullYear()}
                    )
            )
        );
    }

    public validateRecovery(email: string, code: number): Observable<boolean> {
        return this.findMatchUser(email).pipe(
            mergeMap(user =>
                this.getActualAttempt(user._id).pipe(
                    map(previousAttempt => ({attempts: previousAttempt, user}))
                )
            ),
            map(compound => {

                if (!compound.user || !compound.attempts) {
                    throw new BadRequestException('Requested password change attempt invalid');
                }

                if (compound.attempts.code !== code) {
                    throw new NotFoundException('Requested code and email not found');
                }

                return true;

            })
        );
    }

    public updatePassword(email: string, code: number, password: string): Observable<boolean> {
        return this.validateRecovery(email, code).pipe(
            mergeMap(validation => {

                if (!validation) {
                    throw new NotFoundException('Validation with this email and code not found');
                }

                return this.findMatchUser(email);

            }),
            mergeMap(user => {

                if (!user) {
                    throw new NotFoundException('Error while finding validation with this user');
                }

                return this.cacheService.removeKey('recovery:' + user._id).pipe(
                    map(() => user)
                );

            }),
            mergeMap(response =>
                this.authService.register(response._id, password).pipe(
                    map(user => user != null)
                )
            )
        );
    }

    public getActualAttempt(user: string): Observable<PasswordRecovery> {
        return this.cacheService.getKey<PasswordRecovery>('recovery:' + user);
    }

    private findMatchUser(email: string): Observable<UserDocument> {
        return this.userService.list({email, password: {$exists: true}}).pipe(
            map(user => {
                if (user.length === 0) {
                    throw new NotFoundException();
                }
                return user[0];
            })
        );
    }


}
