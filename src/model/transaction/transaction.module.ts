import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Transaction} from './entity/transaction.entity';
import {TransactionSchema} from './entity/transaction.schema';
import {TransactionService} from './transaction.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Transaction.name,
                schema: TransactionSchema
            }
        ])
    ],
    providers: [TransactionService],
    exports: [TransactionService]
})
export class TransactionModule {}
