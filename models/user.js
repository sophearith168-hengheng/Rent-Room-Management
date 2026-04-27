const pool = require("../config/database");



const checkemail = async (email) => {
    const [emaildata] = await pool.query(
        `SELECT user_id, username, email, password, role 
         FROM users 
         WHERE email = ?`,
        [email]
    );
    return emaildata;
};



const getUser = async () => {
    const [data] = await pool.query('SELECT * FROM users');
    return data;
};


const getUserByID = async (id) => {
    const [data] = await pool.query(
        `SELECT user_id, username, email, role 
         FROM users 
         WHERE user_id = ?`,
        [id]
    );
    return data;
};


const createTenantByAdmin = async (body) => {
    const dataarr = [body.username, body.email, body.password];

    const [data] = await pool.query(
        `INSERT INTO users (username, email, password, role)
         VALUES (?, ?, ?, 'Tenant')`,
        dataarr
    );

    return data.insertId;
};


const addToken = async (user_id, token) => {
    const [data] = await pool.query(
        `INSERT INTO user_tokens (user_id, token)
         VALUES (?, ?)`,
        [user_id, token]
    );

    return data.insertId;
};


const findById = async (id) => {
    const [data] = await pool.query(
        `SELECT user_id, username, email, role 
         FROM users 
         WHERE user_id = ?`,
        [id]
    );
    return data;
};



const findToken = async (token) => {
    const [data] = await pool.query(
        `SELECT * FROM user_tokens WHERE token = ?`,
        [token]
    );
    return data;
};



const deleteToken = async (token) => {
    const [data] = await pool.query(
        `DELETE FROM user_tokens WHERE token = ?`,
        [token]
    );
    return data;
};


module.exports = {
    getUser,
    getUserByID,
    checkemail,
    createTenantByAdmin,
    addToken,
    findById,
    findToken,
    deleteToken
};