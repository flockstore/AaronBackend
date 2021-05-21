import {Prop} from "@nestjs/mongoose";

export class CrudActions {

    @Prop({required: false, default: false})
    create: boolean;

    @Prop({required: false, default: false})
    read: boolean;

    @Prop({required: false, default: false})
    update: boolean;

    @Prop({required: false, default: false})
    delete: boolean;

    @Prop({required: false, default: false})
    manage: boolean;

    constructor() {
        this.create = false;
        this.read = false;
        this.update = false;
        this.delete = false;
        this.manage = false;
    }

}
