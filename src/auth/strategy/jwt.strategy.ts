import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthConfigService} from '../../config/auth/config.service';
import {Injectable} from '@nestjs/common';
import {UserService} from '../../model/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authConfigService: AuthConfigService, private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConfigService.secret,
        });
    }

    async validate(payload: any) {
        return this.userService.get(payload.data._id).toPromise();
    }

}
