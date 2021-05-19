import {Module} from "@nestjs/common";
import {MongoDatabaseProviderModule} from "./mongo/provider.module";

@Module({
    imports: [
        MongoDatabaseProviderModule
    ],
    exports: [
        MongoDatabaseProviderModule
    ]
})
export class ProviderModule {}
