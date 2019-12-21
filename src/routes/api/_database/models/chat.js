import mongoose from 'mongoose';

export let Chat = mongoose.model('Chat', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
}));
