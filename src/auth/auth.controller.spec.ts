import { Test, TestingModule } from '@nestjs/testing';
import {MongooseModule} from "@nestjs/mongoose";
import {INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {map, mergeMap} from "rxjs/operators";
import {UserService} from "../model/user/user.service";
import {AuthService} from "./auth.service";
import {UserCreate} from "../model/user/entity/user-create.dto";
import {AuthModule} from "./auth.module";
import {closeInMongodConnection, rootMongooseTestModule} from "../../test/mongoose-memory.helper";
import {User, UserSchema} from "../model/user/entity/user.entity";

describe('AuthController', () => {

    let userService: UserService;
    let service: AuthService;

    let app: INestApplication;

    const validUser: UserCreate = {
        name: "John",
        surname: "Doe",
        email: "admin@martina.com.co",
        password: "MyAwesomePassword123"
    } as UserCreate;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                rootMongooseTestModule(),
                MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
            ]
        }).compile();

        app = module.createNestApplication();
        userService = module.get<UserService>(UserService);
        service = module.get<AuthService>(AuthService);
        await app.init();

    });

    it('/auth/login (POST)', () => {
        return userService.create(validUser).pipe(
            mergeMap(rawUser =>
                service.register(rawUser._id, 'testPassword')
            ),
            map(user =>
                request(app.getHttpServer())
                    .post('/auth/login')
                    .send({email: validUser.email, password: 'testPassword'})
                    .expect(201)
            )
        ).toPromise();
    });

    afterEach(async () => {
        await closeInMongodConnection();
    });

});
