import mongoose from 'mongoose';

export let Message = mongoose.model('Message', new mongoose.Schema({
    content: {
        type: String,
        default: ""
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}));
