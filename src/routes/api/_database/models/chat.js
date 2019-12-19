import mongoose from 'mongoose';

export let Message = mongoose.model('Message', new mongoose.Schema({
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
}));
