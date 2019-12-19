import jwt from 'jsonwebtoken';
import * as db from '../_database/index.js';

export async function post(req, res){
    let authUser = await db.authUser(req.body.user);
    if(!authUser.failed){
        authUser = { username: authUser.username, email: authUser.email };
        jwt.sign({ user: authUser }, "SOMESECRET", (err, token) => {
            if(!err) res.json({ token });
            else res.json({ err: "Failed to authenticate" });
        });
    }
    else res.json({ err: "Failed to authenticate" });
}