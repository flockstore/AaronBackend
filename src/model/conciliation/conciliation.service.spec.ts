import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {map, mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {EventListenerProviderModule} from '../../provider/event/provider.module';
import {ConciliationService} from './conciliation.service';
import {ConciliationModule} from './conciliation.module';
import {conciliationMock} from './entiy/conciliation.mock';
import {AccountService} from '../account/account.service';
import {AccountModule} from '../account/account.module';
import {accountMock} from '../account/entity/account.mock';
import {UserModule} from '../user/user.module';
import {UserService} from '../user/user.service';
import {userMock} from '../user/entity/user.mock';
import {GroupModule} from '../group/group.module';
import {UserDocument} from '../user/entity/user.entity';
import {TransactionService} from '../transaction/transaction.service';

describe('ConciliationService', () => {

    let service: ConciliationService;
    let accountService: AccountService;
    let userService: UserService;

    let transactionService: TransactionService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                ConciliationModule,
                AccountModule,
                UserModule,
                GroupModule,
                EventListenerProviderModule
            ]
        }).compile();

        service = module.get<ConciliationService>(ConciliationService);
        accountService = module.get<AccountService>(AccountService);
        userService = module.get<UserService>(UserService);

        transactionService = module.get(TransactionService);

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

    it('should authorize the conciliation', done => {
        accountService.create(accountMock).pipe(
            mergeMap(account => service.create({...conciliationMock, account: account._id} as any)),
            mergeMap(conciliation =>
                userService.create(userMock).pipe(
                    map(user => ({conciliation, user}))
                )
            ),
            mergeMap(compound =>
                service.authorize(compound.conciliation._id, compound.user._id).pipe(
                    map(authorized => ({conciliation: authorized, user: compound.user}))
                )
            )
        ).subscribe(
            response => {
                expect((response.conciliation.authorized as UserDocument)._id).toEqual(response.user._id);
                done();
            },
            error => {
                expect(error).toBeDefined();
                done();
            }
        );
    });

    afterEach(async () => {
        await closeInMongodConnection();
    });

});
