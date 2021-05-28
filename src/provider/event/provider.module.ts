import {Module} from '@nestjs/common';
import {EventEmitterModule} from '@nestjs/event-emitter';

@Module({
    imports: [
        EventEmitterModule.forRoot({
            wildcard: false,
            delimiter: '.',
            maxListeners: 10,
            verboseMemoryLeak: false,
            ignoreErrors: true
        })
    ],
})
export class EventListenerProviderModule {}
