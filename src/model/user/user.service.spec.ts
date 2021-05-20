import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./entities/user.entity";
import {closeInMongodConnection, rootMongooseTestModule} from "../../../test/mongoose-memory.helper";
import {mergeMap} from "rxjs/operators";
import {UserCreate} from "./entities/user-create.dto";
import * as deletePlugin from "mongoose-delete";

describe('UserService', () => {

    let service: UserService;
    const validUser: UserCreate = {
        name: "John",
        surname: "Doe",
        email: "admin@martina.com.co",
        password: "MyAwesomePassword123"
    } as UserCreate;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeatureAsync([
                    {
                        name: User.name,
                        useFactory: () => {
                            const schema = UserSchema;
                            schema.plugin(deletePlugin);
                            return schema;
                        }
                    }
                ])
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
        createAndValidateSuccess(done, validUser);
        createAndValidateError(done, validUser);
    });

    it('should NOT create an invalid email user', done => {
        createAndValidateError(done, {...validUser, email: 'demo.com'} as UserCreate);
    });

    it('should update an user', done => {

        service.create(validUser).pipe(
            mergeMap(user => service.update(user._id, {name: 'Jonas'} as UserCreate))
        ).subscribe(
            response => {
                expect(response.name).toBe('Jonas');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );


    });

    it('should soft delete an user', done => {

        service.create(validUser).pipe(
            mergeMap(user => service.delete(user._id))
        ).subscribe(
            response => {
                console.log(response);
                expect(response).toBe([]);
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );

    });

    afterEach(async () => {
        await closeInMongodConnection();
    });

    function createAndValidateSuccess(done, user: UserCreate) {
        service.create(user).subscribe(
            response => {
                expect(response).toHaveProperty('_id');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );
    }

    function createAndValidateError(done, user: UserCreate) {
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
