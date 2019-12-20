import jwt from 'jsonwebtoken';
import * as db from '../../_database/index.js';

export async function verify(req, res, next){
    let token = req.headers.authorization;
    if(token){
        jwt.verify(token, "SOMESECRET", async (err, decoded) => {
            if(!err && decoded){
                let { user } = decoded;
                user = await db.getByUser(user);
                if(user.username){
                    req.resp = (req.resp)?{...req.resp, authorized: true}:{authorized: true};
                    req.resp.user = user;
                    next();
                }
                else res.json({ authorized: false })
            }
            else res.json({ authorized: false });
        });
    }
    else res.json({ authorized: false });
}
