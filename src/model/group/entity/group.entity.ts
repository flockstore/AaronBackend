import {Document} from "mongoose";
import {IsNotEmpty} from "class-validator";

export class Group extends Document {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    priority: number;

    permissions: PermissionRegistry;

}

export class PermissionRegistry {
    user: CRUDOperation;
    group: CRUDOperation;
}

export class CRUDOperation {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    manage: boolean;
}

export type GroupDocument = Group & Document;
