import {AbstractAbilityFactory, Subjects} from "../../../permission/ability/abstract-ability.factory";
import {Ability, AbilityBuilder} from "@casl/ability";
import {Action} from "../../../permission/interface/action.enum";
import {FlowCategory} from "../entity/flow-category.entity";

export class FlowCategoryAbilityFactory extends AbstractAbilityFactory {

    constructor(builder: AbilityBuilder<Ability<[Action, Subjects]>>) {
        super(builder, FlowCategory, 'flow_category');
    }

}
