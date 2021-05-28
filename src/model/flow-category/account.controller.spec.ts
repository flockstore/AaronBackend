import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from "../../../test/utilities/mongoose-memory.helper";
import {INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {map} from "rxjs/operators";
import {PermissionModule} from "../../permission/permission.module";
import {EventListenerProviderModule} from "../../provider/event/provider.module";
import {FlowCategoryService} from "./flow-category.service";
import {FlowCategoryController} from "./flow-category.controller";
import {flowCategoryMock} from "./entity/flow-category.mock";
import {FlowCategory} from "./entity/flow-category.entity";
import {FlowCategoryModule} from "./flow-category.module";

describe('FlowCategoryController', () => {

    let service: FlowCategoryService;
    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                FlowCategoryModule,
                EventListenerProviderModule
            ],
            controllers: [FlowCategoryController]
        }).compile();

        app = module.createNestApplication();
        service = module.get<FlowCategoryService>(FlowCategoryService);
        await app.init();

    });

    it('/flow-category (POST)', () => {
        request(app.getHttpServer())
            .post('/flow-category')
            .send(flowCategoryMock)
            .expect(201)
            .expect(res => res.body instanceof FlowCategory);
    });


    it('/flow-category/:id (GET)', () => {
        return service.create(flowCategoryMock).pipe(
            map(flowCategory =>
                request(app.getHttpServer())
                    .get('/flow-category/' + flowCategory._id)
                    .expect(200)
                    .expect(res => res.body instanceof FlowCategory)
            )
        ).toPromise();
    });

    it('/flow-category/:id (PUT)', () => {
        return service.create(flowCategoryMock).pipe(
            map(flowCategory =>
                request(app.getHttpServer())
                    .put('/flow-category/' + flowCategory._id)
                    .send({...flowCategoryMock, name: 'Drinks'})
                    .expect(200)
                    .expect(res => res.body instanceof FlowCategory && res.body.name === 'Drinks')
            )
        ).toPromise();
    });

    it('/flow-category/:id (DELETE)', () => {
        return service.create(flowCategoryMock).pipe(
            map(flowCategory =>
                request(app.getHttpServer())
                    .delete('/flow-category/' + flowCategory._id)
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
