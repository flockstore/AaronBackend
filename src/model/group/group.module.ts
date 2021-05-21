import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Group, GroupSchema} from "./entity/group.entity";
import {GroupService} from "./group.service";

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
