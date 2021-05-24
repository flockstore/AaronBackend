import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from './user.controller';
import {UserService} from "./user.service";
import {closeInMongodConnection, rootMongooseTestModule} from "../../../test/utilities/mongoose-memory.helper";
import {User} from "./entity/user.entity";
import {INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {map} from "rxjs/operators";
import {userMock} from "./entity/user.mock";
import {UserModule} from "./user.module";
import {GroupModule} from "../group/group.module";

describe('UserController', () => {

    let service: UserService;
    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                GroupModule,
                UserModule
            ],
            controllers: [UserController]
        }).compile();

        app = module.createNestApplication();
        service = module.get<UserService>(UserService);
        await app.init();

    });

    it('/user (POST)', () => {
        return request(app.getHttpServer())
            .post('/user')
            .send(userMock)
            .expect(201)
            .expect(res => res.body instanceof User);
    });

    it('/user/:id (GET)', () => {
        return service.create(userMock).pipe(
            map(user =>
                request(app.getHttpServer())
                    .get('/user/' + user._id)
                    .expect(200)
                    .expect(res => res.body instanceof User)
            )
        ).toPromise();
    });

    it('/user/:id (PUT)', () => {
        return service.create(userMock).pipe(
            map(user =>
                request(app.getHttpServer())
                    .put('/user/' + user._id)
                    .send({...userMock, name: 'Jonas'})
                    .expect(200)
                    .expect(res => res.body instanceof User && res.body.name === 'Jonas')
            )
        ).toPromise();
    });

    it('/user/:id (DELETE)', () => {
        return service.create(userMock).pipe(
            map(user =>
                request(app.getHttpServer())
                    .delete('/user/' + user._id)
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
