import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import * as process from 'process';

/**
 * Service dealing with mail configuration options.
 */
@Injectable()
export class EmailConfigService {

    constructor(private configService: ConfigService) {}

    get host(): string {
        return this.configService.get<string>('mail.host');
    }

    get secure(): boolean {
        return this.configService.get<boolean>('mail.secure');
    }

    get user(): string {
        return this.configService.get<string>('mail.user');
    }

    get password(): string {
        return this.configService.get<string>('mail.password');
    }

    get from(): string {
        return this.configService.get<string>('mail.from');
    }

}
