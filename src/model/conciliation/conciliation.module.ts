import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Conciliation} from './entiy/conciliation.entity';
import {ConciliationSchema} from './entiy/conciliation.schema';
import {ConciliationService} from './conciliation.service';
import {ConciliationController} from './conciliation.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Conciliation.name,
                schema: ConciliationSchema
            }
        ])
    ],
    providers: [ConciliationService],
    controllers: [ConciliationController],
    exports: [ConciliationService]
})
export class ConciliationModule {}
