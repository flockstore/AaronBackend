import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {

    constructor(private configService: ConfigService) {}

    get port(): number {
        return this.configService.get<number>('app.port');
    }

    get url(): string {
        return this.configService.get<string>('app.url');
    }

    get env(): string {
        return this.configService.get<string>('app.env');
    }

    get secret(): string {
        return this.configService.get<string>('app.secret');
    }

}
