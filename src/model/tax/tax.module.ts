import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {TaxController} from './tax.controller';
import {Tax} from './entity/tax.entity';
import {TaxSchema} from './entity/tax.schema';
import {TaxService} from './tax.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Tax.name,
                schema: TaxSchema
            }
        ])
    ],
    exports: [TaxService],
    providers: [TaxService],
    controllers: [TaxController]
})
export class TaxModule {}
