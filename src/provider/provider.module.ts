import {Module} from "@nestjs/common";
import {MongoDatabaseProviderModule} from "./mongo/provider.module";
import {EventListenerProviderModule} from "./event/provider.module";

@Module({
    imports: [
        MongoDatabaseProviderModule,
        EventListenerProviderModule
    ],
    exports: [
        MongoDatabaseProviderModule,
        EventListenerProviderModule
    ]
})
export class ProviderModule {}
