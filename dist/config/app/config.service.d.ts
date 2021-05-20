import { ConfigService } from "@nestjs/config";
export declare class AppConfigService {
    private configService;
    constructor(configService: ConfigService);
    get port(): number;
    get url(): string;
    get env(): string;
    get secret(): string;
}
