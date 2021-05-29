import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {FlowSchema} from './entity/flow.schema';
import {Flow} from './entity/flow.entity';
import {FlowService} from './flow.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Flow.name,
                schema: FlowSchema
            }
        ])
    ],
    providers: [FlowService],
    exports: [FlowService]
})
export class FlowModule {}
