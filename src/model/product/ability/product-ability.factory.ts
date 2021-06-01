import {AbstractAbilityFactory, Subjects} from '../../../permission/ability/abstract-ability.factory';
import {Ability, AbilityBuilder} from '@casl/ability';
import {Action} from '../../../permission/interface/action.enum';
import {Product} from '../entity/product.entity';

export class ProductAbilityFactory extends AbstractAbilityFactory {

    constructor(builder: AbilityBuilder<Ability<[Action, Subjects]>>) {
        super(builder, Product, 'product');
    }

}
