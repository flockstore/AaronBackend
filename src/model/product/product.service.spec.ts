import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {ProductModule} from './product.module';
import {productMock} from './entity/product.mock';
import {ProductService} from './product.service';

describe('ProductService', () => {

    let service: ProductService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                ProductModule
            ]
        }).compile();

        service = module.get<ProductService>(ProductService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create a product', done => {
        service.create(productMock).subscribe(
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

    it('should update a product', done => {

        service.create(productMock).pipe(
            mergeMap(product => service.update(product._id, {name: 'Paper'} as any))
        ).subscribe(
            response => {
                expect(response.name).toBe('Paper');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );

    });

    it('should soft delete a product', done => {

        service.create(productMock).pipe(
            mergeMap(product => service.delete(product._id))
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
