import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {CHECK_POLICIES_KEY, PolicyHandler} from "../interface/policy-handler.interface";
import {AppAbility} from "../ability/abstract-ability.factory";
import {AbilityCompoundFactory} from "../ability/ability-compound.factory";
import {User} from "../../model/user/entity/user.entity";

@Injectable()
export class PolicyGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private abilityCompoundFactory: AbilityCompoundFactory,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const policyHandlers =
            this.reflector.get<PolicyHandler[]>(
                CHECK_POLICIES_KEY,
                context.getHandler(),
            ) || [];

        const user: User = context.switchToHttp().getRequest().user;
        const ability = this.abilityCompoundFactory.constructType(user);

        return policyHandlers.every((handler) =>
                PolicyGuard.execPolicyHandler(handler, ability),
        );
    }

    private static execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
        if (typeof handler === 'function') {
            return handler(ability);
        }
        return handler.handle(ability);
    }
}
