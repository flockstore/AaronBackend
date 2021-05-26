import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {GroupModule} from "./group/group.module";
import {AccountModule} from "./account/account.module";

@Module({
    imports: [
        UserModule,
        GroupModule,
        AccountModule
    ],
    exports: [
        UserModule,
        GroupModule,
        AccountModule
    ]
})
export class ModelModule {}
