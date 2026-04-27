const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const crypto = require('crypto');
// const { userInfo } = require('os');


const login = async (body) => {
    const { email, password } = body;

    const userInfo = await user.checkemail(email);

    if (userInfo.length == 0) {
        throw new Error("Incorrect Password or Email");
    }

    let isMatch = await bcrypt.compare(password, userInfo[0].password);

    if (!isMatch) {
        throw new Error("Incorrect Password or Email");
    }

    const token = jwt.sign(
        { id: userInfo[0].user_id, email: userInfo[0].email },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expireIn }
    );

    console.log('Generated token:', token);

    await user.addToken(userInfo[0].user_id, token);

    let row = await user.findById(userInfo[0].user_id);

    return row;
};

module.exports = {
    login
}