import * as db from '../_database/index.js';

export async function post(req, res){
    res.json(await db.authUser(req.body.user));
}