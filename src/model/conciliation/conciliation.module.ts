import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Conciliation} from './entiy/contact.entity';
import {ContactSchema} from './entiy/contact.schema';
import {ConciliationService} from './conciliation.service';
import {ConciliationController} from './conciliation.controller';
import {TransactionModule} from '../transaction/transaction.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Conciliation.name,
                schema: ContactSchema
            }
        ]),
        TransactionModule
    ],
    providers: [ConciliationService],
    controllers: [ConciliationController],
    exports: [ConciliationService]
})
export class ConciliationModule {}
