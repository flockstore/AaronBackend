import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Account} from "./entity/account.entity";
import {AccountSchema} from "./entity/account.schema";
import {AccountService} from "./account.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Account.name,
                schema: AccountSchema
            }
        ])
    ],
    exports: [AccountService],
    providers: [AccountService]
})
export class AccountModule {}
