import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

/**
 * Service dealing with mongo config based operations.
 *
 * @class
 */
@Injectable()
export class MongoConfigService {

    constructor(private configService: ConfigService) {}

    get uri(): string {
        return this.configService.get<string>('mongo.uri');
    }

}
