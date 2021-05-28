import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {User} from './entity/user.entity';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {map} from 'rxjs/operators';
import {userMock} from './entity/user.mock';
import {UserModule} from './user.module';
import {GroupModule} from '../group/group.module';
import functionHelper from '../../../test/utilities/function.helper';
import {AuthModule} from '../../auth/auth.module';
import {AuthService} from '../../auth/auth.service';
import {PermissionModule} from '../../permission/permission.module';

describe('UserController', () => {

    let service: UserService;
    let authService: AuthService;
    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                GroupModule,
                UserModule,
                AuthModule,
            ],
            controllers: [UserController]
        }).compile();

        app = module.createNestApplication();
        service = module.get<UserService>(UserService);
        authService = module.get<AuthService>(AuthService);
        await app.init();

    });

    it('/user (POST)', () => {
        return request(app.getHttpServer())
            .post('/user')
            .send(userMock)
            .expect(201)
            .expect(res => res.body instanceof User);
    });

    it('/user/profile (GET)', () => {
        return functionHelper.createAndLogin(service, authService).pipe(
            map(user =>
                request(app.getHttpServer())
                    .get('/user/profile/me')
                    .set('Authorization', 'bearer ' + user.token)
                    .expect(200)
                    .expect(res => res.body instanceof User)
            )
        ).toPromise();
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
