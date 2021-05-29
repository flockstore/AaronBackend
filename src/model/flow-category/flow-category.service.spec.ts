import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {EventListenerProviderModule} from '../../provider/event/provider.module';
import {FlowCategoryService} from './flow-category.service';
import {FlowCategoryModule} from './flow-category.module';
import {flowCategoryMock} from './entity/flow-category.mock';
import {FlowCategoryDocument} from './entity/flow-category.entity';

describe('FlowCategoryService', () => {

    let service: FlowCategoryService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                FlowCategoryModule,
                EventListenerProviderModule
            ]
        }).compile();

        service = module.get<FlowCategoryService>(FlowCategoryService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create a bank flow category service', done => {
        service.create(flowCategoryMock).subscribe(
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

    it('should update a bank flow category', done => {

        service.create(flowCategoryMock).pipe(
            mergeMap(category => service.update(category._id, {name: 'Drinking'} as FlowCategoryDocument))
        ).subscribe(
            response => {
                expect(response.name).toBe('Drinking');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );

    });

    it('should soft delete an bank flow category', done => {

        service.create(flowCategoryMock).pipe(
            mergeMap(category => service.delete(category._id))
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
