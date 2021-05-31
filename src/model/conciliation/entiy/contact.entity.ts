import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {Account} from '../../account/entity/account.entity';
import {UserDocument} from '../../user/entity/user.entity';

export class Conciliation extends Document {

    @IsNotEmpty()
    account: string | Account;

    @IsNotEmpty()
    value: number;

    authorized?: string | UserDocument;

}

export type ConciliationDocument = Conciliation & Document;
