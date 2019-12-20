import mongoose from 'mongoose';

export let User = mongoose.model('User', new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    profile: {
        firstName: { type: String },
        lastName: { type: String },
        avatarLink: { type: String },
        dataOfBirth: {
            date: { type: Number },
            month: { type: Number },
            year: { type: Number },
        },
    },
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        }
    ]
}));
