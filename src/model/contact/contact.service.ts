import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {Contact, ContactDocument, ContactPartial} from './entity/contact.entity';

@Injectable()
export class ContactService extends ModelService<ContactDocument, ContactPartial> {

    constructor(
        @InjectModel(Contact.name) private contactModel: Model<ContactDocument>
    ) {
        super(contactModel);
    }

}
