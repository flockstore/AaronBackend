import {AbstractAbilityFactory, Subjects} from '../../../permission/ability/abstract-ability.factory';
import {Ability, AbilityBuilder} from '@casl/ability';
import {Action} from '../../../permission/interface/action.enum';
import {Account} from '../entity/account.entity';

export class AccountAbilityFactory extends AbstractAbilityFactory {

    constructor(builder: AbilityBuilder<Ability<[Action, Subjects]>>) {
        super(builder, Account, 'account');
    }

}
