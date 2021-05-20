import {Module} from "@nestjs/common";
import configuration from "./configuration";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as Joi from '@hapi/joi';
import {AppConfigService} from "./config.service";

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
                APP_ENV: Joi.string()
                    .valid('development', 'production', 'test')
                    .default('development'),
                APP_URL: Joi.string().default('localhost'),
                APP_PORT: Joi.number().default(3000),
                APP_SECRET: Joi.string().default('')
            })
        })
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
