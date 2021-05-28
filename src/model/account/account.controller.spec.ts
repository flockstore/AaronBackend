import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {delay, map, mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {AccountService} from './account.service';
import {AccountModule} from './account.module';
import {AccountController} from './account.controller';
import {accountMock} from './entity/account.mock';
import {Account} from './entity/account.entity';
import {EventListenerProviderModule} from '../../provider/event/provider.module';
import {TransactionModule} from '../transaction/transaction.module';
import {Group} from '../group/entity/group.entity';
import {from} from 'rxjs';
import {TransactionService} from '../transaction/transaction.service';

describe('AccountController', () => {

    let service: AccountService;
    let transactionService: TransactionService;
    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                AccountModule,
                TransactionModule,
                EventListenerProviderModule
            ],
            controllers: [AccountController]
        }).compile();

        app = module.createNestApplication();
        service = module.get<AccountService>(AccountService);
        transactionService = module.get<TransactionService>(TransactionService);
        await app.init();

    });

    it('/account (POST)', done => {
        from(request(app.getHttpServer())
            .post('/account')
            .send(accountMock)
            .expect(201)
            .expect(res => res.body instanceof Group)).pipe(
                mergeMap(response =>
                    transactionService.list({'related.id': response.body._id, 'related.action': 'account_creation'} as any)
                ),
                delay(500) // Makes time for the event listener and prevent early connection closing.
        ).subscribe(
            response => {
                expect(response.length).toBe(1);
                expect(response[0]).toBeDefined();
                expect(response[0].exchangeValue).toBe(accountMock.initialValue);
                done();
            }
        );
    });


    it('/account/:id (GET)', () => {
        return service.create(accountMock).pipe(
            map(account =>
                request(app.getHttpServer())
                    .get('/account/' + account._id)
                    .expect(200)
                    .expect(res => res.body instanceof Account)
            )
        ).toPromise();
    });

    it('/account/:id (PUT)', () => {
        return service.create(accountMock).pipe(
            map(account =>
                request(app.getHttpServer())
                    .put('/account/' + account._id)
                    .send({...accountMock, name: 'Premium Account'})
                    .expect(200)
                    .expect(res => res.body instanceof Account && res.body.name === 'Premium Account')
            )
        ).toPromise();
    });

    it('/account/:id (DELETE)', () => {
        return service.create(accountMock).pipe(
            map(account =>
                request(app.getHttpServer())
                    .delete('/account/' + account._id)
                    .expect(200)
                    .expect(res => res.body === true)
            )
        ).toPromise();
    });

    afterEach(async () => {
        await closeInMongodConnection();
        await app.close();
    });

});
