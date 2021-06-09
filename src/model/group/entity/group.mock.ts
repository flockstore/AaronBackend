import {CRUDOperation, GroupDocument} from './group.entity';

export const groupMock: GroupDocument = {
    name: 'Administrator',
    color: 'ffffff',
    priority: 1,
    admin: false
} as GroupDocument;

export const superPerms: CRUDOperation = {
    manage: true,
    create: true,
    read: true,
    update: true,
    delete: true
};
