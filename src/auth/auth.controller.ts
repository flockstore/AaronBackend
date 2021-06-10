import {Body, Controller, Param, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {UserLoginDto} from './entity/user-login.dto';
import {Public} from './guard/jwt-auth.guard';
import {UserDocument} from '../model/user/entity/user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    public login(@Body() login: UserLoginDto): Observable<string> {
        return this.authService.login(login.email, login.password);
    }

    // Must be removed when verification via mail created
    @Public()
    @Post('register')
    public register(@Body() login: UserLoginDto): Observable<UserDocument> {
        return this.authService.register(login.email, login.password);
    }

    @Public()
    @Post('recovery')
    public recovery(@Param('email') email: string): Observable<void> {
        return this.authService.recovery(email);
    }

}
