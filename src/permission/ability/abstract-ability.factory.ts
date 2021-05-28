import {Ability, AbilityBuilder, InferSubjects} from '@casl/ability';
import {Document} from 'mongoose';
import {Action} from '../interface/action.enum';
import {Type} from '@nestjs/common';
import {Group} from '../../model/group/entity/group.entity';

export type Subjects = InferSubjects<typeof Document> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

export abstract class AbstractAbilityFactory {

    protected constructor(
        private builder: AbilityBuilder<Ability<[Action, Subjects]>>, private type: Type, private property: string) {
    }

    constructAbilities(groups: Group[]): AbilityBuilder<Ability<[Action, Subjects]>> {

        if (groups.some(g => g.permissions[this.property] && g.permissions[this.property].manage) || groups.some(g => g.admin)) {
            this.manage(true);
        }

        if (groups.some(g => g.permissions[this.property] && g.permissions[this.property].create)) {
            this.create(true);
        }

        if (groups.some(g => g.permissions[this.property] && g.permissions[this.property].read)) {
            this.read(true);
        }

        if (groups.some(g => g.permissions[this.property] && g.permissions[this.property].update)) {
            this.update(true);
        }

        if (groups.some(g => g.permissions[this.property] && g.permissions[this.property].delete)) {
            this.delete(true);
        }

        return this.builder;

    }

    manage(grant: boolean): void {
        if (grant) {
            this.action(Action.Manage, true);
            this.action(Action.Create, true);
            this.action(Action.Read, true);
            this.action(Action.Update, true);
            this.action(Action.Delete, true);
        }
    }

    create(grant: boolean, condition?: any): void {
        this.action(Action.Create, grant, condition);
    }

    read(grant: boolean, condition?: any): void {
        this.action(Action.Read, grant, condition);
    }

    update(grant: boolean, condition?: any): void {
        this.action(Action.Update, grant, condition);
    }

    delete(grant: boolean, condition?: any): void {
        this.action(Action.Delete, grant, condition);
    }

    action(action: Action, grant: boolean, condition?: any): void {
        if (grant) {
            this.builder.can(action, this.type, condition || 'all');
            return;
        }
        this.builder.cannot(action, this.type, condition || 'all');
    }

}
