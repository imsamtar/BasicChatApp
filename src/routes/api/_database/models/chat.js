import mongoose from 'mongoose';

export let Chat = mongoose.model('Chat', new mongoose.Schema({
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
}));
