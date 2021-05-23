import {Injectable} from "@nestjs/common";
import {Ability, AbilityBuilder, AbilityClass} from "@casl/ability";
import {Action} from "../interface/action.enum";
import {AppAbility, Subjects} from "./abstract-ability.factory";
import {GroupService} from "../../model/group/group.service";
import {UserService} from "../../model/user/user.service";

@Injectable()
export class AbilityCompoundFactory {

    private builder: AbilityBuilder<Ability<[Action, Subjects]>>;

    constructor(
        private groupService: GroupService,
        private userService: UserService
    ) {
        this.builder = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);
    }

    public constructType() {

        return this.builder.build();

    }

}
