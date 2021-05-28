import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {UserLoginDto} from './entity/user-login.dto';
import {Public} from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    public login(@Body() login: UserLoginDto): Observable<string> {
        return this.authService.login(login.email, login.password);
    }

}
