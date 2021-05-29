import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {FlowSchema} from './entity/flow.schema';
import {Flow} from './entity/flow.entity';
import {FlowService} from './flow.service';
import {FlowController} from './flow.controller';

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
    controllers: [FlowController],
    exports: [FlowService]
})
export class FlowModule {}
