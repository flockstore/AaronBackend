import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {Account} from '../../account/entity/account.entity';
import {UserDocument} from '../../user/entity/user.entity';
import {PartialModel} from '../../../common/model/partial-model';

export class ConciliationPartial extends PartialModel {}

export class Conciliation extends ConciliationPartial {

    @IsNotEmpty()
    account: string | Account;

    @IsNotEmpty()
    value: number;

    authorized?: string | UserDocument;

}

export type ConciliationDocument = Conciliation & Document;
