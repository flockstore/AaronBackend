import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {Tax, TaxDocument} from './entity/tax.entity';

@Injectable()
export class TaxService extends ModelService<TaxDocument, TaxDocument> {

    constructor(
        @InjectModel(Tax.name) private taxModel: Model<TaxDocument>
    ) {
        super(taxModel);
    }

}
