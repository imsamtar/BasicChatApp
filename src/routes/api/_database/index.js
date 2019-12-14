import bcrypt from 'bcryptjs';
import { User } from '../_database/models/users';


export async function getUsers(){
    return (await User.find()).map(user => removeHash(user));
}
export async function getUser(id){
    try {
        let user = await User.findById(id);
        return removeHash(user);
    }catch(err){
        return { errmsg: 'Not found'};
    }
}
export async function postUser(user){
    try {
        user.hash = await bcrypt.hashSync(user.hash, 10);
        user = await new User(user);
        await user.save();
        return removeHash(user);
    }catch(err){
        return { errmsg: err.errmsg };
    }
}
export async function putUser(user){
    return users.find((user) => user.id===id);
}
export async function patchUser(id, user){
    await User.findByIdAndUpdate(id, user)
    return removeHash(await User.findById(id));
}

function removeHash(user){
    user.hash = undefined;
    return user;
}