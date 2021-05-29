import {Test, TestingModule} from '@nestjs/testing';
import {map, mergeMap} from 'rxjs/operators';
import {UserService} from '../model/user/user.service';
import {closeInMongodConnection, rootMongooseTestModule} from '../../test/utilities/mongoose-memory.helper';
import {UserDocument} from '../model/user/entity/user.entity';
import {AuthModule} from './auth.module';
import {AuthService} from './auth.service';
import {TokenSerializer} from './serializer/token.serializer';
import {Observable} from 'rxjs';
import {userMock} from '../model/user/entity/user.mock';
import {GroupModule} from '../model/group/group.module';
import {UserModule} from '../model/user/user.module';
import {PermissionModule} from '../permission/permission.module';

describe('AuthService', () => {

    let userService: UserService;
    let service: AuthService;
    let tokenSerializer: TokenSerializer;


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

        userService = module.get<UserService>(UserService);
        service = module.get<AuthService>(AuthService);
        tokenSerializer = module.get<TokenSerializer>(TokenSerializer);

    });

    it('should create the services', () => {
        expect(userService).toBeDefined();
        expect(service).toBeDefined();
        expect(tokenSerializer).toBeDefined();
    });

    it('should register an user', done => {

        getRegisteredUser().subscribe(
            user => {
                expect(user).toHaveProperty('salt');
                expect(user).toHaveProperty('password');
                done();
            },

            error => {
                expect(error).toBe(null);
                done();
            }
        );

    });

    it('should login an user', done => {

        getRegisteredUser().pipe(
            mergeMap(pendingUser =>
                service.login(pendingUser.email, 'testPassword').pipe(
                    map(token => ({
                        token: tokenSerializer.decryptPayload(token),
                        user: pendingUser
                    }))
                )
            ),
        ).subscribe(
            decrypted => {
                expect((decrypted.token.data as {_id})._id.toString() === decrypted.user._id.toString()).toBe(true);
                done();
            },

            error => {
                expect(error).toBe(null);
                done();
            }
        );

    });

    afterEach(async () => {
        await closeInMongodConnection();
    });

    function getRegisteredUser(): Observable<UserDocument> {
        return userService.create(userMock).pipe(
            mergeMap(pendingUser =>
                service.register(pendingUser._id, 'testPassword')
            )
        );
    }

});
