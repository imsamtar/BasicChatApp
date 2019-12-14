import * as db from '../_database/index.js';

export async function get(req, res){
    res.json(await db.getUsers());
}
export async function post(req, res){
    res.json(await db.postUser(req.body.user));
}