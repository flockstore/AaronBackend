import * as mongoose from 'mongoose';

function getCRUDPermission() {
    return {
        create: {
            type: Boolean,
            default: false
        },
        read: {
            type: Boolean,
            default: false
        },
        update: {
            type: Boolean,
            default: false
        },
        delete: {
            type: Boolean,
            default: false
        },
        manage: {
            type: Boolean,
            default: false
        }
    }
}

export const GroupSchema = new mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
    priority: {type: Number, required: true},
    admin: {type: Boolean, default: false},
    permissions: {
        user: getCRUDPermission(),
        group: getCRUDPermission(),
        account: getCRUDPermission(),
        flow_category: getCRUDPermission()
    }
});
