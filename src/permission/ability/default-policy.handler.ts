import {PolicyHandlerInterface} from '../interface/policy-handler.interface';
import {AppAbility} from './abstract-ability.factory';
import {Action} from '../interface/action.enum';
import {Type} from '@nestjs/common';

export class DefaultPolicyHandler implements PolicyHandlerInterface {

    private constructor(action: Action, type: Type) {
        this.action = action;
        this.type = type;
    }

    private readonly action: Action;
    private readonly type: Type;

    public static check(action: Action, type: Type): DefaultPolicyHandler {
        return new DefaultPolicyHandler(action, type);
    }

    handle(ability: AppAbility) {
        return ability.can(this.action, this.type);
    }

}
