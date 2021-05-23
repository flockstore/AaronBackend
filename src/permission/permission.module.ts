import {Module} from '@nestjs/common';
import {AbilityCompoundFactory} from "./ability/ability-compound.factory";
import {ModelModule} from "../model/model.module";

@Module({
    imports: [ModelModule],
    providers: [AbilityCompoundFactory],
    exports: [AbilityCompoundFactory]
})
export class PermissionModule {}
