import {AbstractAbilityFactory, Subjects} from "../../../permission/ability/abstract-ability.factory";
import {Ability, AbilityBuilder} from "@casl/ability";
import {Action} from "../../../permission/interface/action.enum";
import {User} from "../entity/user.entity";

export class UserAbilityFactory extends AbstractAbilityFactory {

    constructor(builder: AbilityBuilder<Ability<[Action, Subjects]>>) {
        super(builder, User, 'user');
    }

}
