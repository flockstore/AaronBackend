import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ModelService} from "../../common/service/model.service";
import {FlowCategory, FlowCategoryDocument} from "./entity/flow-category.entity";

@Injectable()
export class FlowCategoryService extends ModelService<FlowCategoryDocument, FlowCategoryDocument> {

    constructor(
        @InjectModel(FlowCategory.name) private flowCategoryModel: Model<FlowCategoryDocument>
    ) {
        super(flowCategoryModel);
    }

}
