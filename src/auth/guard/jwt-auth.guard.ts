import {ExecutionContext, Injectable, SetMetadata} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {Reflector} from "@nestjs/core";
import {AppConfigService} from "../../config/app/config.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private reflector: Reflector, private appConfigService: AppConfigService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        return this.appConfigService.env === 'test' || isPublic || super.canActivate(context);
    }

}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
