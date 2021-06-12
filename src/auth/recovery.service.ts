import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {UserService} from '../model/user/user.service';
import {CacheService} from '../provider/cache/cache.service';
import {MailService} from '../provider/mail/mail.service';
import {UserDocument} from '../model/user/entity/user.entity';
import {PasswordRecovery} from './interface/password-recovery.interface';

@Injectable()
export class RecoveryService {

    constructor(
        private userService: UserService,
        private cacheService: CacheService,
        private mailService: MailService
    ) {}

    public sendRecovery(email: string): Observable<any> {
        return this.findMatchUser(email).pipe(
            mergeMap(user =>
                this.getAttempts(user._id).pipe(
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

    public getAttempts(user: string): Observable<PasswordRecovery> {
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
