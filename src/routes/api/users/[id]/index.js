import * as db from '../../_database/index';

export async function get(req, res){
    const { id } = req.params;
    let user = await db.getUser(id);
    res.json(user?user:{ msg: "doesn't exist"});
}
export async function patch(req, res){
    
    try{
        const { id } = req.params;
        let {user} = req.body;
        user = await db.patchUser(id, user);
        res.json(user);
    }catch(err){
        res.json(user?user:{ msg: "doesn't exist"});
    }
}