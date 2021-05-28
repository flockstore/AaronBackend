import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {Group, GroupDocument} from './entity/group.entity';

@Injectable()
export class GroupService extends ModelService<GroupDocument, GroupDocument> {

    constructor(
        @InjectModel(Group.name) private groupModel: Model<GroupDocument>
    ) {
        super(groupModel);
    }

}
