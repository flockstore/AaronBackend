import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./model/user.schema";
import {closeInMongodConnection, rootMongooseTestModule} from "../../test/mongoose-memory.helper";

describe('UserService', () => {

    let service: UserService;
    const validUser: User = {
        name: "John",
        surname: "Doe",
        email: "admin@martina.com.co",
        password: "MyAwesomePassword123"
    };

    beforeAll(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
            ],
            providers: [UserService]
        }).compile();

        service = module.get<UserService>(UserService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create an user', done => {
        service.create(validUser).subscribe(
            response => {
                expect(response).toHaveProperty('_id');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );
    });

    it('should NOT create a duplicated email user', done => {
        createAndValidateError(done, validUser);
    });

    it('should NOT create an invalid email user', done => {
        createAndValidateError(done, {...validUser, email: 'demo.com'});
    });

    afterAll(async () => {
        await closeInMongodConnection();
    });

    function createAndValidateError(done, user: User) {
        service.create(user).subscribe(
            response => {
                expect(response).toBeNull();
                done();
            },
            error =>  {
                expect(error).not.toBeNull();
                done();
            }
        );
    }

});
