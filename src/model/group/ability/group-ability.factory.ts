import {AbstractAbilityFactory, Subjects} from "../../../permission/ability/abstract-ability.factory";
import {Ability, AbilityBuilder} from "@casl/ability";
import {Action} from "../../../permission/interface/action.enum";
import {Group} from "../entity/group.entity";

export class GroupAbilityFactory extends AbstractAbilityFactory {

    constructor(builder: AbilityBuilder<Ability<[Action, Subjects]>>) {
        super(builder, Group, 'group');
    }

}
