import jwt from 'jsonwebtoken';
import {User} from '../routes/api/_database/models/user';
import {Chat} from '../routes/api/_database/models/chat';
import {Message} from '../routes/api/_database/models/message';

let connections = [];
export function connected(socket){
    connections.push(socket);
    socket.on("disconnect", s => connections = connections.filter(() => s.id!=socket.id));
    socket.on("auth", async ({token, id}) => {
        try {
            if(token && id && jwt.verify(token, process.env.SECRET)){
                let user = jwt.decode(token).user;
                user = await User.findOne(user, 'chats');
                if(!!user.chats.find(c => c==id)){
                    socket.emit("auth", true);
                    let last;
                    let listen = setInterval(() => {
                        Chat.findById(id, { messages: {$slice: -20} }).populate('messages').exec(async (err, res) => {
                            res = res.toObject();
                            res.messages = res.messages.map(m => {
                                m._id = m._id.toString();
                                return m;
                            });
                            if(err) console.log(err);
                            else if(typeof(last)=="undefined") last = res.messages[res.messages.length-1]._id;
                            else if(last!=res.messages[res.messages.length-1]._id){
                                last = res.messages[res.messages.length-1]._id;
                                for(let i=0;i<res.messages.length;i++){
                                    res.messages[i].sender = (await Message.findById(res.messages[i]._id).populate('sender')).sender.username;
                                }
                                socket.emit("new msg", res);
                            }
                        })
                    }, 1000);
                    socket.on('stop listen', data => {
                        if(data.token==token && data.id==id) clearInterval(listen);
                    });
                }else{
                    socket.emit("auth", false);
                }
            }
            else socket.emit("auth", false);
        }catch(err){
            console.log(err);
            socket.emit("auth", false);
        }
    })
}
