import {User} from '../../../../_database/models/user.js';
import {Chat} from '../../../../_database/models/chat.js';
import {Message} from '../../../../_database/models/message.js';
import {Types} from 'mongoose';
import {io} from '../../../../../../server';

export async function get(req, res){
    try{
        let chat = (await Chat.aggregate([{$match: {_id: Types.ObjectId(req.params.id) }}, {$unwind: '$messages'}, {$lookup: {from: 'messages', localField: 'messages', foreignField: '_id', as: 'messages'}}, {$unwind: '$messages'}, {$project: {name: 1, 'messages.content': 1, 'messages.sender': 1}}, {$project: {_id: 0}}, {$lookup: {from: 'users', localField: 'messages.sender', foreignField: '_id', as: 'messages.sender'}}, {$project: {'name': 1, 'messages.content': 1, 'messages.sender.username': 1}}, {$unwind: '$messages.sender'}, {$project: {'messages.sender': '$messages.sender.username', 'messages.content': 1, name: 1}}, {$group: {_id: '$name', messages: {$push: '$messages'}}}, {$project: {name: '$_id', _id: 0, messages: 1}}]));
        if(chat && chat.length>0) {
            res.json(chat[0])
        }
        else res.json({ found: false });
    }catch(err){
        res.json({ found: false });
    }
}

export async function post(req, res){
    User.findById(req.resp.user.id).populate("chats").exec(async (err, user) => {
        if(!err){
            let newMsg = await (new Message({content: req.body.content, sender: req.resp.user._id})).save();
            let chat = user.chats.find(c => {
                if(c._id==req.params.id){
                    Chat.findByIdAndUpdate(c._id, {$push: {messages: newMsg._id}}, async (err, doc) => {
                        let messages = (await Chat.findById(c._id).populate('messages')).messages;
                        let t = messages.pop();
                        t['_doc'].sender = req.resp.user.username;
                        io.emit('new msg '+req.params.id, true);
                        res.json(t);
                    });
                }
                return c._id==req.params.id;
            });
            if(!chat) res.json({ success: false });
        }
        else res.json({ success: false });
    });
}
