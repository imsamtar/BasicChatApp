import {User} from '../../../../_database/models/user.js';
import {Chat} from '../../../../_database/models/chat.js';
import {Message} from '../../../../_database/models/message.js';

export async function get(req, res){
    let chat = (await User.findById(req.resp.user._id).populate("chats","_id")).chats.find(c => c._id==req.params.id);
    if(chat) {
        chat = (await Chat.findById(chat._id).populate("messages"));
        res.json(chat)
    }
    else res.json({ found: false });
}

export async function post(req, res){
    User.findById(req.resp.user.id).populate("chats").exec(async (err, user) => {
        if(!err){
            let newMsg = await (new Message({content: req.body.content, sender: req.resp.user._id})).save();
            let chat = user.chats.find(c => {
                if(c._id==req.params.id){
                    Chat.findByIdAndUpdate(c._id, {$push: {messages: newMsg._id}}, async (err, doc) => {
                        let messages = (await Chat.findById(c._id).populate('messages')).messages;
                        res.json(messages.pop());
                    });
                }
                return c._id==req.params.id;
            });
            if(!chat) res.json({ success: false });
        }
        else res.json({ success: false });
    });
}
