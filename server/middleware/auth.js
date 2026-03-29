import jwt from 'jsonwebtoken';
import Users from '../models/Users.js';

export const verifyToken = async (req, res, next) =>{
    let token;
    const jwtSecret = 'ARandomSecretKeyForJWTTokenABCDE12345!@#$%';//SECRET KEY [For production: It will be stored as environment variable]
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const verified = jwt.verify(token,jwtSecret);
            // GET USER FROM TOKEN
            req.user = await Users.findById(verified.id).select("-password");
            next();
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
    if(!token){
        return res.status(403);//FORBIDDEN ERROR
    } 
}