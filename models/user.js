const pool = require("../config/database")


const checkemail = async(email) =>{
    const [emaildata] = await pool.query(`select username,email,password,role from users where email = ?`,[email]);
    return emaildata;
}



const getUser = async() => {
    const [data] = await pool.query('select * from users')
    return data;
}

const getUserByID = async(id) =>{
    const [data] = await pool.query(`select username,email,password,role from users where user_id = ?`,[id]);
    return data;
}


const createTenantByAdmin  = async(body) =>{
    const dataarr = [body.username,body.email,body.password,body.role]
    const [data] = await pool.query( `INSERT INTO users (username, email, password, role)
         VALUES (?, ?, ?, 'Tenant')`,dataarr);

    return data.insertId;

}

module.exports = {
    getUser,
    getUserByID,
    checkemail,
    createTenantByAdmin
}