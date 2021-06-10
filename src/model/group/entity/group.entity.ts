import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {PartialModel} from '../../../common/model/partial-model';

export class GroupPartial extends PartialModel {}

export class Group extends GroupPartial {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    priority: number;

    @IsNotEmpty()
    admin: boolean;

    permissions: PermissionRegistry;

}

export class PermissionRegistry {
    user: CRUDOperation;
    group: CRUDOperation;
    account: CRUDOperation;
    flow_category: CRUDOperation;
    flow: CRUDOperation;
    contact: CRUDOperation;
    invoice: CRUDOperation;
}

export class CRUDOperation {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    manage: boolean;
}

export type GroupDocument = Group & Document;
