import {Module} from '@nestjs/common';
import {AppConfigModule} from './app/config.module';
import {MongoConfigModule} from './mongo/config.module';
import {AuthConfigModule} from './auth/config.module';

/**
 * Import and provide all the authentication configuration related modules.
 *
 * @module
 */
@Module({
    imports: [
        AppConfigModule,
        AuthConfigModule,
        MongoConfigModule
    ],
    exports: [
        AppConfigModule,
        AuthConfigModule,
        MongoConfigModule
    ]
})
export class GlobalConfigModule {}
