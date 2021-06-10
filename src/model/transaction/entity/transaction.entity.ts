import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {Account} from '../../account/entity/account.entity';
import {PartialModel} from '../../../common/model/partial-model';

export class CompoundMeta {}

export class TransactionPartial extends PartialModel {}

export class TransactionCompound {

    id: string;

    @IsNotEmpty()
    action: string;

    meta: CompoundMeta;

}

export class Transaction extends TransactionPartial {

    @IsNotEmpty()
    baseValue: number;

    @IsNotEmpty()
    previousValue: number;

    @IsNotEmpty()
    exchangeValue: number;

    account: Account | string;

    addition: boolean;

    @IsNotEmpty()
    related: TransactionCompound;

    compound: TransactionCompound[];

}


export type TransactionDocument = Transaction & Document;
