import {Module} from "@nestjs/common";
import configuration from "./configuration";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as Joi from '@hapi/joi';
import {AuthConfigService} from "./config.service";

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                AUTH_EXPIRATION: Joi.string().default('30d'),
                AUTH_SECRET: Joi.string().default('martina')
            })
        })
    ],
    providers: [ConfigService, AuthConfigService],
    exports: [ConfigService, AuthConfigService],
})
export class AuthConfigModule {}
