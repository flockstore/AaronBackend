import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {Transaction, TransactionDocument, TransactionPartial} from './entity/transaction.entity';
import {Observable} from 'rxjs';

@Injectable()
export class TransactionService extends ModelService<TransactionDocument, TransactionPartial> {

    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>
    ) {
        super(transactionModel);
    }

    public update(id: string, partial: TransactionDocument): Observable<TransactionDocument> {
        throw new Error('Transactions should not be updated, balance will be compromised.');
    }

    public delete(id: string): Observable<boolean> {
        throw new Error('Transactions should not be deleted, balance will be compromised.');
    }

}
