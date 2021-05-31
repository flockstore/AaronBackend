import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Contact} from './entity/contact.entity';
import {ContactService} from './contact.service';
import {ContactSchema} from './entity/contact.schema';
import {ContactController} from './contact.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Contact.name,
                schema: ContactSchema
            }
        ])
    ],
    exports: [ContactService],
    providers: [ContactService],
    controllers: [ContactController]
})
export class ContactModule {}
