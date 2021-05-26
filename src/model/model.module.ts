import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {GroupModule} from "./group/group.module";
import {AccountModule} from "./account/account.module";
import { TransactionModule } from './transaction/transaction.module';

@Module({
    imports: [
        UserModule,
        GroupModule,
        AccountModule,
        TransactionModule
    ],
    exports: [
        UserModule,
        GroupModule,
        AccountModule,
        TransactionModule
    ]
})
export class ModelModule {}
