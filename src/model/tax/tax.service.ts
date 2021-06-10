import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {Tax, TaxDocument, TaxPartial} from './entity/tax.entity';

@Injectable()
export class TaxService extends ModelService<TaxDocument, TaxPartial> {

    constructor(
        @InjectModel(Tax.name) private taxModel: Model<TaxDocument>
    ) {
        super(taxModel);
    }

}
