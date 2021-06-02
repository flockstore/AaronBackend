import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {InvoiceSchema} from './entity/invoice.schema';
import {Invoice} from './entity/invoice.entity';
import {InvoiceService} from './invoice.service';
import {InvoiceController} from './invoice.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Invoice.name,
                schema: InvoiceSchema
            }
        ])
    ],
    exports: [InvoiceService],
    providers: [InvoiceService],
    controllers: [InvoiceController]
})
export class InvoiceModule {}
