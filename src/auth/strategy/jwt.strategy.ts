import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {AuthConfigService} from "../../config/auth/config.service";
import {Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {UserDocument} from "../../model/user/entity/user.entity";
import {UserService} from "../../model/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authConfigService: AuthConfigService, private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConfigService.secret,
        });
    }

    validate(payload: {_id: string}): Observable<UserDocument> {
        return this.userService.get(payload._id);
    }

}
