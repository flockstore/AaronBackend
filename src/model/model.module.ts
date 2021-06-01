import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {GroupModule} from './group/group.module';
import {AccountModule} from './account/account.module';
import {TransactionModule} from './transaction/transaction.module';
import {FlowCategoryModule} from './flow-category/flow-category.module';
import {FlowModule} from './flow/flow.module';
import {ConciliationModule} from './conciliation/conciliation.module';
import {ContactModule} from './contact/contact.module';
import {ProductModule} from './product/product.module';

@Module({
    imports: [
        UserModule,
        GroupModule,
        AccountModule,
        ConciliationModule,
        ContactModule,
        ProductModule,
        TransactionModule,
        FlowCategoryModule,
        FlowModule
    ],
    exports: [
        UserModule,
        GroupModule,
        AccountModule,
        ConciliationModule,
        ContactModule,
        ProductModule,
        TransactionModule,
        FlowCategoryModule,
        FlowModule
    ]
})
export class ModelModule {}
