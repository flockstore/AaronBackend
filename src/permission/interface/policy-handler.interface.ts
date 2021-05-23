import {AppAbility} from "../ability/abstract-ability.factory";
import {SetMetadata} from "@nestjs/common";

export interface PolicyHandlerInterface {
    handle(ability: AppAbility): boolean;
}


type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = PolicyHandlerInterface | PolicyHandlerCallback;

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
    SetMetadata(CHECK_POLICIES_KEY, handlers);
