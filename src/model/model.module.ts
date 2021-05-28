import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {GroupModule} from "./group/group.module";
import {AccountModule} from "./account/account.module";
import {TransactionModule} from './transaction/transaction.module';
import {FlowCategoryModule} from "./flow-category/flow-category.module";

@Module({
    imports: [
        UserModule,
        GroupModule,
        AccountModule,
        TransactionModule,
        FlowCategoryModule
    ],
    exports: [
        UserModule,
        GroupModule,
        AccountModule,
        TransactionModule,
        FlowCategoryModule
    ]
})
export class ModelModule {}
