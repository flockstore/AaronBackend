import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {GroupSchema} from './entity/group.schema';
import {GroupService} from './group.service';
import {Group} from './entity/group.entity';
import {GroupController} from './group.controller';

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
    providers: [GroupService],
    controllers: [GroupController]
})
export class GroupModule {}
