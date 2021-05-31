import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {TaxService} from './tax.service';
import {taxMock} from './entity/tax.mock';
import {TaxModule} from './tax.module';

describe('TaxService', () => {

    let service: TaxService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                TaxModule
            ]
        }).compile();

        service = module.get<TaxService>(TaxService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create a tax', done => {
        service.create(taxMock).subscribe(
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

    it('should update a tax', done => {

        service.create(taxMock).pipe(
            mergeMap(tax => service.update(tax._id, {name: 'IVA 20%'} as any))
        ).subscribe(
            response => {
                expect(response.name).toBe('IVA 20%');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );

    });

    it('should soft delete a tax', done => {

        service.create(taxMock).pipe(
            mergeMap(tax => service.delete(tax._id))
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
