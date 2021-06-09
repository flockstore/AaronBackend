import {Module} from '@nestjs/common';
import {AppConfigModule} from './app/config.module';
import {MongoConfigModule} from './mongo/config.module';
import {AuthConfigModule} from './auth/config.module';
import {EmailConfigModule} from './mail/config.module';

/**
 * Import and provide all the authentication configuration related modules.
 */
@Module({
    imports: [
        AppConfigModule,
        AuthConfigModule,
        EmailConfigModule,
        MongoConfigModule
    ],
    exports: [
        AppConfigModule,
        AuthConfigModule,
        EmailConfigModule,
        MongoConfigModule
    ]
})
export class GlobalConfigModule {}
