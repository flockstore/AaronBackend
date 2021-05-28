import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {PermissionModule} from '../../permission/permission.module';
import {TransactionService} from './transaction.service';
import {TransactionModule} from './transaction.module';
import {transactionMock} from './entity/transaction.mock';
import {AccountModule} from '../account/account.module';
import {AccountService} from '../account/account.service';
import {accountMock} from '../account/entity/account.mock';
import {mergeMap} from 'rxjs/operators';
import {EventListenerProviderModule} from '../../provider/event/provider.module';

describe('TransactionService', () => {

    let service: TransactionService;
    let accountService: AccountService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                TransactionModule,
                AccountModule,
                EventListenerProviderModule
            ]
        }).compile();

        service = module.get<TransactionService>(TransactionService);
        accountService = module.get<AccountService>(AccountService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create a transaction', done => {
        accountService.create(accountMock).pipe(
            mergeMap(account => service.create({...transactionMock, account: account._id} as any))
        ).subscribe(
            response => {
                expect(response).toHaveProperty('_id');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );
    });

    afterEach(async () => {
        await closeInMongodConnection();
    });

});
