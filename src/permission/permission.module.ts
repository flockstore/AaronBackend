import {Global, Module} from '@nestjs/common';
import {AbilityCompoundFactory} from "./ability/ability-compound.factory";
import {PolicyGuard} from "./guard/policy.guard";

@Global()
@Module({
    providers: [AbilityCompoundFactory, PolicyGuard],
    exports: [AbilityCompoundFactory, PolicyGuard]
})
export class PermissionModule {}
