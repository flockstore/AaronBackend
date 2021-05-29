import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {FlowCategory} from '../../flow-category/entity/flow-category.entity';

export class Flow extends Document {

    @IsNotEmpty()
    value: number;

    @IsNotEmpty()
    category: FlowCategory | string;

    notes: string;

}

export type FlowDocument = Flow & Document;
