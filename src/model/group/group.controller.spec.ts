import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {map} from 'rxjs/operators';
import {Group} from './entity/group.entity';
import {GroupService} from './group.service';
import {GroupController} from './group.controller';
import {groupMock} from './entity/group.mock';
import {GroupModule} from './group.module';
import {PermissionModule} from '../../permission/permission.module';

describe('GroupController', () => {

    let service: GroupService;
    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                GroupModule
            ],
            controllers: [GroupController]
        }).compile();

        app = module.createNestApplication();
        service = module.get<GroupService>(GroupService);
        await app.init();

    });

    it('/group (POST)', () => {
        return request(app.getHttpServer())
            .post('/group')
            .send(groupMock)
            .expect(201)
            .expect(res => res.body instanceof Group);
    });

    it('/group/:id (GET)', () => {
        return service.create(groupMock).pipe(
            map(user =>
                request(app.getHttpServer())
                    .get('/group/' + user._id)
                    .expect(200)
                    .expect(res => res.body instanceof Group)
            )
        ).toPromise();
    });

    it('/group/:id (PUT)', () => {
        return service.create(groupMock).pipe(
            map(group =>
                request(app.getHttpServer())
                    .put('/group/' + group._id)
                    .send({...groupMock, name: 'Jonas'})
                    .expect(200)
                    .expect(res => res.body instanceof Group && res.body.name === 'Jonas')
            )
        ).toPromise();
    });

    it('/group/:id (DELETE)', () => {
        return service.create(groupMock).pipe(
            map(user =>
                request(app.getHttpServer())
                    .delete('/group/' + user._id)
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
