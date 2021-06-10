import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {FlowCategory} from '../../flow-category/entity/flow-category.entity';
import {PartialModel} from '../../../common/model/partial-model';

export class FlowPartial extends PartialModel {}

export class Flow extends FlowPartial {

    @IsNotEmpty()
    value: number;

    @IsNotEmpty()
    category: FlowCategory | string;

    notes: string;

}

export type FlowDocument = Flow & Document;
