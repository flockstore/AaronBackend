import {Document} from 'mongoose';
import {PartialModel} from '../../../common/model/partial-model';

export class AccountPartial extends PartialModel {}

export class Account extends AccountPartial {
    name: string;
    number: number;
    bank: string;
    image: string;
}


export type AccountDocument = Account & Document;
