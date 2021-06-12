import {Module} from '@nestjs/common';
import {MongoDatabaseProviderModule} from './mongo/provider.module';
import {EventListenerProviderModule} from './event/provider.module';
import {MailProviderModule} from './mail/provider.module';
import {CacheProviderModule} from './cache/provider.module';

@Module({
    imports: [
        CacheProviderModule,
        MailProviderModule,
        MongoDatabaseProviderModule,
        EventListenerProviderModule
    ],
    exports: [
        CacheProviderModule,
        MailProviderModule,
        MongoDatabaseProviderModule,
        EventListenerProviderModule
    ]
})
export class ProviderModule {}
