import {User} from '../../../_database/models/user.js';
import {Chat} from '../../../_database/models/chat.js';

export async function get(req, res){
    let chats = (await User.findById(req.resp.user._id).populate("chats")).chats;
    chats = chats.map(chat => {
        chat.messages=chat.messages.slice(chat.messages.length-3,chat.messages.length);
        return chat;
    });
    res.json(chats);
}

export async function post(req, res){
    let chats = (await User.findById(req.resp.user._id).populate("chats")).chats;
    let newChat = await (new Chat({ name: req.body.name, messages: [] })).save();
    await User.findByIdAndUpdate(req.resp.user._id, { $push: { chats: newChat } });
    res.json(newChat);
}
