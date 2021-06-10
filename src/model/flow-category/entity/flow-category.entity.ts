import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {PartialModel} from '../../../common/model/partial-model';

export class FlowCategoryPartial extends PartialModel {}

export class FlowCategory extends FlowCategoryPartial {

    @IsNotEmpty()
    name: string;

    income: boolean;

    description: string;

    parent?: string | FlowCategory;

}

export type FlowCategoryDocument = FlowCategory & Document;
