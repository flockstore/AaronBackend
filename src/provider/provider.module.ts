import {Module} from '@nestjs/common';
import {MongoDatabaseProviderModule} from './mongo/provider.module';
import {EventListenerProviderModule} from './event/provider.module';
import {MailProviderModule} from './mail/provider.module';

@Module({
    imports: [
        MailProviderModule,
        MongoDatabaseProviderModule,
        EventListenerProviderModule
    ],
    exports: [
        MailProviderModule,
        MongoDatabaseProviderModule,
        EventListenerProviderModule
    ]
})
export class ProviderModule {}
