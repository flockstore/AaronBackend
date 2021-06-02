import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {Invoice, InvoiceDocument} from './entity/invoice.entity';

@Injectable()
export class InvoiceService extends ModelService<InvoiceDocument, InvoiceDocument> {

    constructor(
        @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>
    ) {
        super(invoiceModel);
    }

}
