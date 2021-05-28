import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';

export class FlowCategory extends Document {

    @IsNotEmpty()
    name: string;

    income: boolean;

    description: string;

    parent?: string | FlowCategory;

}

export type FlowCategoryDocument = FlowCategory & Document;
