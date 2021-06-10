import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {Invoice, InvoiceDocument, InvoicePartial} from './entity/invoice.entity';

@Injectable()
export class InvoiceService extends ModelService<InvoiceDocument, InvoicePartial> {

    constructor(
        @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>
    ) {
        super(invoiceModel);
    }

}
