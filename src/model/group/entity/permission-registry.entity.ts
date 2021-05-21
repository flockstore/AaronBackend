import {CrudActions} from "./crud-actions.entity";
import {Prop} from "@nestjs/mongoose";
import {ValidateNested} from "class-validator";

export class PermissionRegistry {

    @Prop({required: false, default: new CrudActions()})
    user: CrudActions;

    @Prop({required: false, default: new CrudActions()})
    group: CrudActions;

    constructor() {
        this.user = new CrudActions();
        this.group = new CrudActions();
    }

}
