import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

/**
 * Service dealing with auth config based operations.
 */
@Injectable()
export class AuthConfigService {

    constructor(private configService: ConfigService) {}

    get expiration(): string {
        return this.configService.get<string>('auth.expiration');
    }

    get secret(): string {
        return this.configService.get<string>('auth.secret');
    }

}
