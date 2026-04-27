const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const user = require('../models/user');

const isLogin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        
        if(!authHeader){
            return res.json({
                result : false,
                msg : 'You need to login'
            })
        }

        let parts = authHeader.split(' ');
        console.log(parts);
        if(parts.length !== 2 || parts[0] !== 'Bearer'){
            return res.json({
                result : false,
                msg : 'Invalid Token'
            })
        }

        let token = parts[1];
        let decode = jwt.verify(token, jwtConfig.secret);
        console.log(decode);

        // Check if token exists in database
        const tokenInDb =  await user.getByToken(token);
        if (!tokenInDb || tokenInDb.length === 0) {
            throw new Error('Token not found in database');
        }


        req.user = decode;
        
        next();
        
        
    } catch (error) {
        console.log(error);
        return res.json({
            result : false,
            msg : 'Invalid Token'
        })
        
    }
}

module.exports = {
    isLogin
}