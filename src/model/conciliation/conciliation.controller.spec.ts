import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {map, mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {EventListenerProviderModule} from '../../provider/event/provider.module';
import {TransactionService} from '../transaction/transaction.service';
import {ConciliationModule} from './conciliation.module';
import {AccountModule} from '../account/account.module';
import {UserModule} from '../user/user.module';
import {GroupModule} from '../group/group.module';
import {ConciliationService} from './conciliation.service';
import {AccountService} from '../account/account.service';
import {UserService} from '../user/user.service';
import {conciliationMock} from './entiy/conciliation.mock';
import {accountMock} from '../account/entity/account.mock';
import {Conciliation} from './entiy/conciliation.entity';
import {userMock} from '../user/entity/user.mock';
import {from} from 'rxjs';

describe('AccountController', () => {


    let service: ConciliationService;
    let accountService: AccountService;
    let userService: UserService;
    let transactionService: TransactionService;
    let app: INestApplication;

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

        app = module.createNestApplication();

        accountService = module.get<AccountService>(AccountService);
        service = module.get<ConciliationService>(ConciliationService);
        transactionService = module.get<TransactionService>(TransactionService);
        userService = module.get<UserService>(UserService);

        await app.init();

    });

    it('/conciliation (POST)', () => {
        return accountService.create(accountMock).pipe(
            map(account =>
                request(app.getHttpServer())
                    .post('/conciliation')
                    .send({...conciliationMock, account: account._id})
                    .expect(201)
                    .expect(res => res.body instanceof Conciliation)
            )
        ).toPromise();
    });


    it('/conciliation/:id (GET)', () => {
        return accountService.create(accountMock).pipe(
            mergeMap(account =>
                service.create({...conciliationMock, account: account._id} as any)
            ),
            map(conciliation =>
                request(app.getHttpServer())
                    .get('/conciliation/' + conciliation._id)
                    .expect(200)
                    .expect(res => res.body instanceof Conciliation && res.body._id === conciliation._id)
            )
        ).toPromise();
    });

    it('/conciliation/authorize/:id (PUT)', () => {

        return userService.create(userMock).pipe(
            mergeMap(user =>
                accountService.create(accountMock).pipe(map(account => ({user, account})))
            ),
            mergeMap(compound =>
                service.create({...conciliationMock, account: compound.account._id} as any).pipe(
                    map(conciliation => ({...compound, conciliation}))
                )
            ),
            map(compound =>
                from(request(app.getHttpServer())
                    .put('/conciliation/authorize/' + compound.conciliation._id)
                    .expect(200)
                    .expect(res => res.body instanceof Conciliation && res.body.authorized)),
            ),
        ).toPromise();

    });

    afterEach(async () => {
        await closeInMongodConnection();
        await app.close();
    });

});
