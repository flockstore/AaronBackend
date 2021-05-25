import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {map, mergeMap} from "rxjs/operators";
import {UserService} from "../model/user/user.service";
import {AuthService} from "./auth.service";
import {AuthModule} from "./auth.module";
import {closeInMongodConnection, rootMongooseTestModule} from "../../test/utilities/mongoose-memory.helper";
import {userMock} from "../model/user/entity/user.mock";
import {GroupModule} from "../model/group/group.module";
import {UserModule} from "../model/user/user.module";
import {PermissionModule} from "../permission/permission.module";

describe('AuthController', () => {

    let userService: UserService;
    let service: AuthService;

    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                GroupModule,
                UserModule,
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
            map(() =>
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
