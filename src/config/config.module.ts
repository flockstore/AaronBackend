import {Module} from "@nestjs/common";
import {AppConfigModule} from "./app/config.module";
import {MongoConfigModule} from "./mongo/config.module";

/**
 * Import and provide all the global configuration related modules.
 *
 * @module
 */
@Module({
    imports: [
        AppConfigModule,
        MongoConfigModule
    ],
    exports: [
        AppConfigModule,
        MongoConfigModule
    ]
})
export class GlobalConfigModule {}
