import {Users} from '../models/Users';

let auth = (req, res, next)=> {
    let token = req.cookies.x_auth;

    Users.findByToken(token, (err, user)=> {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next();
    })
}

export default {auth};