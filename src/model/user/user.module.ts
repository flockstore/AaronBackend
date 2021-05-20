import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./entities/user.entity";
import { UserController } from './user.controller';
import {UserService} from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ])
    ],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
