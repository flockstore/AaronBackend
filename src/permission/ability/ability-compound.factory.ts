import {Injectable} from "@nestjs/common";
import {Ability, AbilityBuilder, AbilityClass} from "@casl/ability";
import {Action} from "../interface/action.enum";
import {AppAbility, Subjects} from "./abstract-ability.factory";
import {User} from "../../model/user/entity/user.entity";
import {UserAbilityFactory} from "../../model/user/ability/user-ability.factory";
import {Group} from "../../model/group/entity/group.entity";
import {GroupAbilityFactory} from "../../model/group/ability/group-ability.factory";

@Injectable()
export class AbilityCompoundFactory {

    private builder: AbilityBuilder<Ability<[Action, Subjects]>>;

    constructor(
    ) {
        this.builder = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);
    }

    public constructType(user: User) {
        const groups: Group[] = user.groups.map(g => g.group as Group);
        new UserAbilityFactory(this.builder).constructAbilities(groups);
        new GroupAbilityFactory(this.builder).constructAbilities(groups);
        return this.builder.build();
    }

}
