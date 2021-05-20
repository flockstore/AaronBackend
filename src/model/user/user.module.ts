import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./entities/user.entity";
import { UserController } from './user.controller';
import {UserService} from "./user.service";
import * as deletePlugin from "mongoose-delete";

@Module({
    imports: [
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
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
