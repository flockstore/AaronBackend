import {Module} from '@nestjs/common';
import configuration from './configuration';
import {ConfigModule, ConfigService} from '@nestjs/config';
import * as Joi from '@hapi/joi';
import {EmailConfigService} from './config.service';

/**
 * Import and provide app configuration related classes.
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                MAIL_HOST: Joi.string().default('demo.com'),
                MAIL_SECURE: Joi.boolean().default(true),
                MAIL_USER: Joi.string().default('demo@demo.com'),
                MAIL_PASSWORD: Joi.string().default('1234'),
                MAIL_FROM: Joi.string().default('Martina Aaron')
            })
        })
    ],
    providers: [ConfigService, EmailConfigService],
    exports: [ConfigService, EmailConfigService],
})
export class EmailConfigModule {}
