import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';
import {Connection, Error, Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {Conciliation, ConciliationDocument} from './entiy/conciliation.entity';
import {from, Observable, throwError} from 'rxjs';
import {UserDocument} from '../user/entity/user.entity';
import {TransactionService} from '../transaction/transaction.service';
import {map, mergeMap} from 'rxjs/operators';
import {Transaction} from '../transaction/entity/transaction.entity';
import {AccountDocument} from '../account/entity/account.entity';

@Injectable()
export class ConciliationService extends ModelService<ConciliationDocument, ConciliationDocument> {

    constructor(
        @InjectModel(Conciliation.name) private conciliationModel: Model<ConciliationDocument>,
        @InjectConnection() private connection: Connection,
        private transactionService: TransactionService
    ) {
        super(conciliationModel);
    }

    public authorize(id: string, authorizer: UserDocument): Observable<ConciliationDocument> {

        return from(this.conciliationModel.findById(id)).pipe(
            mergeMap(record => {

                if (!record) {
                    return throwError(new NotFoundException('Conciliation not found'));
                }

                if (record.authorized) {
                    return throwError(new BadRequestException('Conciliation already authorized'));
                }

                return from(this.connection.startSession()).pipe(
                    mergeMap(session => {

                        session.startTransaction();

                        this.transactionService.create({
                            baseValue: record.value,
                            previousValue: 0,
                            exchangeValue: record.value,
                            addition: true,
                            account: (record.account as AccountDocument)._id,
                            related: {
                                id: record._id,
                                action: 'conciliation',
                                meta: {}
                            }
                        } as Transaction);

                        record.authorized = authorizer._id;

                        return from(record.save()).pipe(
                            map(updatedRecord => {
                                session.endSession();
                                return updatedRecord;
                            })
                        );

                    })
                );

            })
        );

    }

    public update(id: string, partial: ConciliationDocument): Observable<ConciliationDocument> {
        throw new Error('Conciliation should not be updated, balance will be compromised.');
    }

    public delete(id: string): Observable<boolean> {
        throw new Error('Conciliation should not be deleted, balance will be compromised.');
    }

}
