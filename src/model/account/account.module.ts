import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Account} from "./entity/account.entity";
import {AccountSchema} from "./entity/account.schema";
import {AccountService} from "./account.service";
import {AccountController} from "./account.controller";
import {AccountCreationListener} from "./listener/account-creation.listener";
import {TransactionModule} from "../transaction/transaction.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Account.name,
                schema: AccountSchema
            }
        ]),
        TransactionModule
    ],
    exports: [AccountService],
    controllers: [AccountController],
    providers: [AccountService, AccountCreationListener]
})
export class AccountModule {}
