import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {GroupSchema} from "./entity/group.schema";
import {GroupService} from "./group.service";
import {Group} from "./entity/group.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Group.name,
                schema: GroupSchema
            }
        ])
    ],
    exports: [GroupService],
    providers: [GroupService]
})
export class GroupModule {}
