import jwt from 'jsonwebtoken';
import * as db from '../_database/index.js';

export async function post(req, res){
    let token = req.headers.authorization;
    if(token){
        jwt.verify(token, "SOMESECRET", async (err, decoded) => {
            if(!err && decoded){
                let { user } = decoded;
                user = await db.getByUser(user);
                if(user.username) res.json(user);
                else res.json({ success: false })
            }
            else res.json({ success: false });
        });
    }
    else res.json({ success: false });
}
