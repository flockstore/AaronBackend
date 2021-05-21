import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import {UserService} from "./user.service";
import {closeInMongodConnection, rootMongooseTestModule} from "../../../test/mongoose-memory.helper";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./entity/user.entity";
import {INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {map} from "rxjs/operators";

describe('UserController', () => {

    const validUser: User = {
        name: "John",
        surname: "Doe",
        email: "admin@martina.com.co",
        password: "MyAwesomePassword123"
    } as User;

    let service: UserService;
    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
            ],
            providers: [UserService],
            controllers: [UserController]
        }).compile();

        app = module.createNestApplication();
        service = module.get<UserService>(UserService);
        await app.init();

    });

    it('/user (POST)', () => {
        return request(app.getHttpServer())
            .post('/user')
            .send(validUser)
            .expect(201)
            .expect(res => res.body instanceof User);
    });

    it('/user/:id (GET)', () => {
        return service.create(validUser).pipe(
            map(user =>
                request(app.getHttpServer())
                    .get('/user/' + user._id)
                    .expect(200)
                    .expect(res => res.body instanceof User)
            )
        ).toPromise();
    });

    it('/user/:id (PUT)', () => {
        return service.create(validUser).pipe(
            map(user =>
                request(app.getHttpServer())
                    .put('/user/' + user._id)
                    .send({...validUser, name: 'Jonas'})
                    .expect(200)
                    .expect(res => res.body instanceof User && res.body.name === 'Jonas')
            )
        ).toPromise();
    });

    it('/user/:id (DELETE)', () => {
        return service.create(validUser).pipe(
            map(user =>
                request(app.getHttpServer())
                    .delete('/user/' + user._id)
                    .send({...validUser, name: 'Jonas'})
                    .expect(200)
                    .expect(res => res.body === true)
            )
        ).toPromise();
    });

    afterEach(async () => {
        await closeInMongodConnection();
    });

});
