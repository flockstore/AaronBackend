import {AbstractAbilityFactory, Subjects} from '../../../permission/ability/abstract-ability.factory';
import {Ability, AbilityBuilder} from '@casl/ability';
import {Action} from '../../../permission/interface/action.enum';
import {Invoice} from '../entity/invoice.entity';

export class InvoiceAbilityFactory extends AbstractAbilityFactory {

    constructor(builder: AbilityBuilder<Ability<[Action, Subjects]>>) {
        super(builder, Invoice, 'invoice');
    }

}
