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
import {FlowCategoryService} from '../flow-category/flow-category.service';
import {flowCategoryMock} from '../flow-category/entity/flow-category.mock';
import {flowMock} from './entity/flowMock';
import {Flow, FlowDocument} from './entity/flow.entity';
import functionHelper from '../../../test/utilities/function.helper';
import {FlowModule} from './flow.module';
import {FlowCategoryModule} from '../flow-category/flow-category.module';

describe('FlowController', () => {

    let service: FlowService;
    let categoryService: FlowCategoryService;
    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                FlowModule,
                FlowCategoryModule,
                TransactionModule,
                EventListenerProviderModule
            ]
        }).compile();

        app = module.createNestApplication();
        service = module.get<FlowService>(FlowService);
        categoryService = module.get<FlowCategoryService>(FlowCategoryService);
        await app.init();

    });

    it('/flow (POST)', () => {
        return categoryService.create(flowCategoryMock).pipe(
            mergeMap(category =>
                from(request(app.getHttpServer())
                    .post('/flow')
                    .send({...flowMock, category: category._id})
                    .expect(201)
                    .expect(res => res.body instanceof Flow && (res.body as FlowDocument)._id.toString() === category._id)
                ).pipe(
                    map(flow => ({flow, category}))
                )
            )
        ).toPromise();
    });


    it('/flow/:id (GET)', () => {
        return functionHelper.createWithCategory(categoryService, service).pipe(
            map(account =>
                request(app.getHttpServer())
                    .get('/flow/' + (account.flow as FlowDocument)._id)
                    .expect(200)
                    .expect(res => res.body instanceof Flow)
            )
        ).toPromise();
    });

    it('/flow/:id (PUT)', () => {
        return functionHelper.createWithCategory(categoryService, service).pipe(
            map(category =>
                request(app.getHttpServer())
                    .put('/flow/' + (category.flow as FlowDocument)._id)
                    .send({notes: 'Invoice 777'})
                    .expect(200)
                    .expect(res => res.body instanceof Flow && res.body.notes === 'Invoice 777')
            )
        ).toPromise();
    });

    it('/flow/:id (DELETE)', () => {
        return functionHelper.createWithCategory(categoryService, service).pipe(
            map(category =>
                request(app.getHttpServer())
                    .delete('/flow/' + (category.flow as FlowDocument)._id)
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
