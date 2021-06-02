import {Injectable} from '@nestjs/common';
import {Ability, AbilityBuilder, AbilityClass} from '@casl/ability';
import {Action} from '../interface/action.enum';
import {AppAbility, Subjects} from './abstract-ability.factory';
import {User} from '../../model/user/entity/user.entity';
import {UserAbilityFactory} from '../../model/user/ability/user-ability.factory';
import {Group} from '../../model/group/entity/group.entity';
import {GroupAbilityFactory} from '../../model/group/ability/group-ability.factory';
import {AccountAbilityFactory} from '../../model/account/ability/account-ability.factory';
import {FlowCategoryAbilityFactory} from '../../model/flow-category/ability/flow-category-ability.factory';
import {FlowAbilityFactory} from '../../model/flow/ability/flow-ability.factory';
import {ContactAbilityFactory} from '../../model/contact/ability/contact-ability.factory';
import {TaxAbilityFactory} from '../../model/tax/ability/tax-ability.factory';
import {ProductAbilityFactory} from '../../model/product/ability/product-ability.factory';
import {InvoiceAbilityFactory} from '../../model/invoice/ability/invoice-ability.factory';

@Injectable()
export class AbilityCompoundFactory {

    private builder: AbilityBuilder<Ability<[Action, Subjects]>>;

    constructor() {
        this.builder = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);
    }

    public constructType(user: User) {
        const groups: Group[] = process.env.APP_ENVIRONMENT === 'test' ?
            [{admin: true, permissions: {}} as Group] :
            user.groups.map(g => g.group as Group);

        new UserAbilityFactory(this.builder).constructAbilities(groups);
        new GroupAbilityFactory(this.builder).constructAbilities(groups);
        new AccountAbilityFactory(this.builder).constructAbilities(groups);
        new FlowCategoryAbilityFactory(this.builder).constructAbilities(groups);
        new FlowAbilityFactory(this.builder).constructAbilities(groups);
        new ContactAbilityFactory(this.builder).constructAbilities(groups);
        new TaxAbilityFactory(this.builder).constructAbilities(groups);
        new ProductAbilityFactory(this.builder).constructAbilities(groups);
        new InvoiceAbilityFactory(this.builder).constructAbilities(groups);
        return this.builder.build();
    }

}
