import {AbstractAbilityFactory, Subjects} from '../../../permission/ability/abstract-ability.factory';
import {Ability, AbilityBuilder} from '@casl/ability';
import {Action} from '../../../permission/interface/action.enum';
import {Contact} from '../entity/contact.entity';

export class ContactAbilityFactory extends AbstractAbilityFactory {

    constructor(builder: AbilityBuilder<Ability<[Action, Subjects]>>) {
        super(builder, Contact, 'contact');
    }

}
