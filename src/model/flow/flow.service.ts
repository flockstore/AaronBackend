import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {Flow, FlowDocument} from './entity/flow.entity';

@Injectable()
export class FlowService extends ModelService<FlowDocument, FlowDocument> {

    constructor(
        @InjectModel(Flow.name) private flowModel: Model<FlowDocument>
    ) {
        super(flowModel);
    }

}
