import { ConfigService } from "@nestjs/config";
export declare class MongoConfigService {
    private configService;
    constructor(configService: ConfigService);
    get uri(): string;
}
