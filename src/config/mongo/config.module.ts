import {Module} from '@nestjs/common';
import configuration from './configuration';
import {ConfigModule, ConfigService} from '@nestjs/config';
import * as Joi from '@hapi/joi';
import {MongoConfigService} from './config.service';

/**
 * Import and provide app configuration related classes.
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                MONGO_URI: Joi.string().default('mongodb://localhost:27017/aaron')
            })
        })
    ],
    providers: [ConfigService, MongoConfigService],
    exports: [ConfigService, MongoConfigService],
})
export class MongoConfigModule {}
