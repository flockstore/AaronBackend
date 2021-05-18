import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import {UserService} from "./user.service";
import {closeInMongodConnection, rootMongooseTestModule} from "../../test/mongoose-memory.helper";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./model/user.schema";

describe('UserController', () => {

    let controller: UserController;

    beforeAll(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
            ],
            providers: [UserService],
            controllers: [UserController]
        }).compile();

        controller = module.get<UserController>(UserController);

    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    afterAll(async () => {
        await closeInMongodConnection();
    });

});
