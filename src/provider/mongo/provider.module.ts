import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MongoConfigModule} from '../../config/mongo/config.module';
import {MongoConfigService} from '../../config/mongo/config.service';
import * as mongooseAutopopulate from 'mongoose-autopopulate';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [MongoConfigModule],
            useFactory: async (mongoService: MongoConfigService) => ({
                uri: mongoService.uri,
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                connectionFactory: (connection) => {
                    connection.plugin(mongooseAutopopulate);
                    return connection;
                }
            }),
            inject: [MongoConfigService]
        })
    ],
})
export class MongoDatabaseProviderModule {}
