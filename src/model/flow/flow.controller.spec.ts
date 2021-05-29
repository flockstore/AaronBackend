import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {map, mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {EventListenerProviderModule} from '../../provider/event/provider.module';
import {TransactionModule} from '../transaction/transaction.module';
import {from} from 'rxjs';
import {FlowService} from './flow.service';
import {FlowController} from './flow.controller';
import {FlowCategoryController} from '../flow-category/flow-category.controller';
import {FlowCategoryService} from '../flow-category/flow-category.service';
import {flowCategoryMock} from '../flow-category/entity/flow-category.mock';
import {flowMock} from './entity/flowMock';
import {Flow} from './entity/flow.entity';
import {FlowCategory} from '../flow-category/entity/flow-category.entity';
import functionHelper from '../../../test/utilities/function.helper';

describe('FlowController', () => {

    let service: FlowService;
    let categoryService: FlowCategoryService;
    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                FlowController,
                FlowCategoryController,
                TransactionModule,
                EventListenerProviderModule
            ],
            controllers: [FlowController]
        }).compile();

        app = module.createNestApplication();
        service = module.get<FlowService>(FlowService);
        categoryService = module.get<FlowCategoryService>(FlowCategoryService);
        await app.init();

    });

    it('/flow (POST)', done => {

        categoryService.create(flowCategoryMock).pipe(
            mergeMap(category =>
                from(request(app.getHttpServer())
                    .post('/flow')
                    .send({...flowMock, category: category._id})
                    .expect(201)
                    .expect(res => res.body instanceof Flow)
                ).pipe(
                    map(flow => ({flow, category}))
                )
            )
        ).subscribe(
            response => {
                expect(response.flow).toHaveProperty('_id');
                expect((response.flow.body.category as FlowCategory)._id).toStrictEqual(response.category._id);
                done();
            }
        );
    });


    it('/account/:id (GET)', () => {
        return functionHelper.createWithCategory(categoryService, service).pipe(
            map(account =>
                request(app.getHttpServer())
                    .get('/account/' + account.flow._id)
                    .expect(200)
                    .expect(res => res.body instanceof Flow)
            )
        ).toPromise();
    });

    it('/account/:id (PUT)', () => {
        return functionHelper.createWithCategory(categoryService, service).pipe(
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
