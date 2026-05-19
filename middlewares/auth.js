const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const user = require('../models/user');
const authRole = require('./authRole');

const isLogin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                result: false,
                msg: 'You need to login'
            });
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({
                result: false,
                msg: 'Invalid Token'
            });
        }

        const token = parts[1];
        const decode = jwt.verify(token, jwtConfig.secret);

        // Check if token exists in database
        const tokenInDb = await user.findToken(token);
        if (!tokenInDb || tokenInDb.length === 0) {
            throw new Error('Token not found in database');
        }

        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            result: false,
            msg: 'Invalid Token'
        });
    }
};

const isAdmin = [isLogin, authRole('Admin')];

module.exports = {
    isLogin,
    isAdmin
};