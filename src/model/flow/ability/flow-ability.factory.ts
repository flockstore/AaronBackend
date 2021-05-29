import {AbstractAbilityFactory, Subjects} from '../../../permission/ability/abstract-ability.factory';
import {Ability, AbilityBuilder} from '@casl/ability';
import {Action} from '../../../permission/interface/action.enum';
import {Flow} from '../entity/flow.entity';

export class FlowAbilityFactory extends AbstractAbilityFactory {

    constructor(builder: AbilityBuilder<Ability<[Action, Subjects]>>) {
        super(builder, Flow, 'flow');
    }

}
