import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {PartialModel} from '../../../common/model/partial-model';

export class TaxPartial extends PartialModel {}

export class Tax extends TaxPartial {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    percentage: number;

}

export type TaxDocument = Tax & Document;
