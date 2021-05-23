import {Test, TestingModule} from '@nestjs/testing';
import {MongooseModule} from "@nestjs/mongoose";
import {INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {map, mergeMap} from "rxjs/operators";
import {UserService} from "../model/user/user.service";
import {AuthService} from "./auth.service";
import {AuthModule} from "./auth.module";
import {closeInMongodConnection, rootMongooseTestModule} from "../../test/mongoose-memory.helper";
import {User} from "../model/user/entity/user.entity";
import {UserSchema} from "../model/user/entity/user.schema";
import {userMock} from "../model/user/entity/user.mock";

describe('AuthController', () => {

    let userService: UserService;
    let service: AuthService;

    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
                AuthModule
            ]
        }).compile();

        app = module.createNestApplication();
        userService = module.get<UserService>(UserService);
        service = module.get<AuthService>(AuthService);
        await app.init();

    });

    it('/auth/login (POST)', () => {
        return userService.create(userMock).pipe(
            mergeMap(rawUser =>
                service.register(rawUser._id, 'testPassword')
            ),
            map(user =>
                request(app.getHttpServer())
                    .post('/auth/login')
                    .send({email: userMock.email, password: 'testPassword'})
                    .expect(201)
            )
        ).toPromise();
    });

    afterEach(async () => {
        await closeInMongodConnection();
    });

});
