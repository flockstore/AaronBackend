import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {Contact, ContactDocument} from './entity/contact.entity';

@Injectable()
export class ContactService extends ModelService<ContactDocument, ContactDocument> {

    constructor(
        @InjectModel(Contact.name) private contactModel: Model<ContactDocument>
    ) {
        super(contactModel);
    }

}
