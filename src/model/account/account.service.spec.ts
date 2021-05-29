import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {AccountModule} from './account.module';
import {AccountService} from './account.service';
import {accountMock} from './entity/account.mock';
import {AccountCreate} from './entity/account-create.dto';
import {EventListenerProviderModule} from '../../provider/event/provider.module';

describe('AccountService', () => {

    let service: AccountService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                AccountModule,
                EventListenerProviderModule
            ]
        }).compile();

        service = module.get<AccountService>(AccountService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create a account', done => {
        service.create(accountMock).subscribe(
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

    it('should update an account', done => {

        service.create(accountMock).pipe(
            mergeMap(account => service.update(account._id, {name: 'Davivienda'} as AccountCreate))
        ).subscribe(
            response => {
                expect(response.name).toBe('Davivienda');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );

    });

    it('should soft delete an account', done => {

        service.create(accountMock).pipe(
            mergeMap(account => service.delete(account._id))
        ).subscribe(
            response => {
                expect(response).toBe(true);
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
