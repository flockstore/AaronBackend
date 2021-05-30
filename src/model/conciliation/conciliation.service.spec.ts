import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {EventListenerProviderModule} from '../../provider/event/provider.module';
import {ConciliationService} from './conciliation.service';
import {ConciliationModule} from './conciliation.module';
import {conciliationMock} from './entiy/conciliation.mock';
import {AccountService} from '../account/account.service';
import {AccountModule} from '../account/account.module';
import {accountMock} from '../account/entity/account.mock';
import {UserModule} from '../user/user.module';

describe('ConciliationService', () => {

    let service: ConciliationService;
    let accountService: AccountService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                ConciliationModule,
                AccountModule,
                UserModule,
                EventListenerProviderModule
            ]
        }).compile();

        service = module.get<ConciliationService>(ConciliationService);
        accountService = module.get<AccountService>(AccountService);

    });

    it('should create the services', () => {
        expect(service).toBeDefined();
        expect(accountService).toBeDefined();
    });

    it('should create a conciliation record', done => {
        accountService.create(accountMock).pipe(
            mergeMap(account => service.create({...conciliationMock, account: account._id} as any))
        )
        .subscribe(
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
