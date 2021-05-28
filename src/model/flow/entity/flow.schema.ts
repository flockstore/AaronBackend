import mongoose, {Schema} from 'mongoose';

export const FlowSchema = new mongoose.Schema({
    value: {type: Number, required: true},
    bank: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        autopopulate: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'FlowCategory',
        required: true,
        autopopulate: true
    },
    notes: {type: String, default: ''}
});
