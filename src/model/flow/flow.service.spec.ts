import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {map, mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {EventListenerProviderModule} from '../../provider/event/provider.module';
import {FlowService} from './flow.service';
import {FlowModule} from './flow.module';
import {flowMock} from './entity/flowMock';
import {Flow, FlowDocument} from './entity/flow.entity';
import {FlowCategoryService} from '../flow-category/flow-category.service';
import {FlowCategoryModule} from '../flow-category/flow-category.module';
import {flowCategoryMock} from '../flow-category/entity/flow-category.mock';
import {FlowCategory} from '../flow-category/entity/flow-category.entity';
import {Observable} from 'rxjs';

describe('FlowService', () => {

    let service: FlowService;
    let flowCategoryService: FlowCategoryService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                FlowModule,
                FlowCategoryModule,
                EventListenerProviderModule
            ]
        }).compile();

        service = module.get<FlowService>(FlowService);
        flowCategoryService = module.get<FlowCategoryService>(FlowCategoryService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create a bank flow record', done => {
        createWithCategory().subscribe(
            response => {
                expect(response.flow).toHaveProperty('_id');
                expect(response.flow.category instanceof FlowCategory).toBe(true);
                expect((response.flow.category as FlowCategory)._id).toBe(response.category._id);
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );
    });

    it('should update a bank flow', done => {

        createWithCategory().pipe(
            mergeMap(flowCompound => service.update(flowCompound.flow._id, {notes: 'Invoice 777'} as FlowDocument))
        ).subscribe(
            response => {
                expect(response.notes).toBe('Invoice 777');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );

    });

    it('should soft delete an bank flow', done => {

        createWithCategory().pipe(
            mergeMap(flowCompound => service.delete(flowCompound.flow._id))
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

    function createWithCategory(): Observable<{flow: Flow, category: FlowCategory}> {
        return flowCategoryService.create(flowCategoryMock).pipe(
            mergeMap(category =>
                service.create(flowMock).pipe(
                    map(flow => ({flow, category}))
                )
            )
        );
    }

});
