import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {MongoConfigModule} from "../../config/mongo/config.module";
import {MongoConfigService} from "../../config/mongo/config.service";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [MongoConfigModule],
            useFactory: async (mongoService: MongoConfigService) => ({
                uri: mongoService.uri
            }),
            inject: [MongoConfigService]
        })
    ],
})
export class MongoDatabaseProviderModule {}
