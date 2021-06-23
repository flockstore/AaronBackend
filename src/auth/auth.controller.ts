import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {PasswordUpdateDto, RecoveryDto, UserLoginDto, ValidateRecoveryDto} from './entity/user-login.dto';
import {Public} from './guard/jwt-auth.guard';
import {UserDocument} from '../model/user/entity/user.entity';
import {RecoveryService} from './recovery.service';
import {map} from 'rxjs/operators';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private recoveryService: RecoveryService) {}

    @Public()
    @Post('login')
    public login(@Body() login: UserLoginDto): Observable<{token: string}> {
        return this.authService.login(login.email, login.password).pipe(
            map(token => ({token}))
        );
    }

    // Must be removed when verification via mail created
    @Public()
    @Post('register')
    public register(@Body() login: UserLoginDto): Observable<UserDocument> {
        return this.authService.register(login.email, login.password);
    }

    @Public()
    @Post('recovery')
    public recovery(@Body() email: RecoveryDto): Observable<void> {
        return this.recoveryService.sendRecovery(email.email);
    }

    @Public()
    @Post('validate-recovery')
    public validateRecovery(@Body() recovery: ValidateRecoveryDto): Observable<boolean> {
        return this.recoveryService.validateRecovery(recovery.email, recovery.code);
    }

    @Public()
    @Post('update-password')
    public updatePassword(@Body() recovery: PasswordUpdateDto): Observable<boolean> {
        return this.recoveryService.updatePassword(recovery.email, recovery.code, recovery.password);
    }

}
