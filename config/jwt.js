let jwtConfig = {
    secret : process.env.SECRET,
    expireIn : process.env.EXPIREIN
};

module.exports = jwtConfig;