import {Document} from 'mongoose';
import {PartialModel} from '../../../common/model/partial-model';

export class Account extends Document {
    name: string;
    number: number;
    bank: string;
    image: string;
}

export class AccountPartial extends PartialModel {}

export type AccountDocument = Account & Document;
