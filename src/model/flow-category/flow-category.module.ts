import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {FlowCategory} from './entity/flow-category.entity';
import {FlowCategorySchema} from './entity/flow-category.schema';
import {FlowCategoryService} from './flow-category.service';
import {FlowCategoryController} from './flow-category.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: FlowCategory.name,
                schema: FlowCategorySchema
            }
        ])
    ],
    providers: [FlowCategoryService],
    controllers: [FlowCategoryController],
    exports: [FlowCategoryService]
})
export class FlowCategoryModule {}
