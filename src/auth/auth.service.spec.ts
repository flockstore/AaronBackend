import {Test, TestingModule} from '@nestjs/testing';
import {MongooseModule} from "@nestjs/mongoose";
import {map, mergeMap} from "rxjs/operators";
import {UserService} from "../model/user/user.service";
import {UserCreate} from "../model/user/entity/user-create.dto";
import {closeInMongodConnection, rootMongooseTestModule} from "../../test/mongoose-memory.helper";
import {User, UserDocument, UserSchema} from "../model/user/entity/user.entity";
import {AuthModule} from "./auth.module";
import {AuthService} from "./auth.service";
import {TokenSerializer} from "./serializer/token.serializer";
import {Observable} from "rxjs";

describe('AuthService', () => {

    let userService: UserService;
    let service: AuthService;
    let tokenSerializer: TokenSerializer;

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
                expect((decrypted.token.data as {_id})._id == decrypted.user._id).toBe(true);
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
        return userService.create(validUser).pipe(
            mergeMap(pendingUser =>
                service.register(pendingUser._id, 'testPassword')
            )
        );
    }

});
