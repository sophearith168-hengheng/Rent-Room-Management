const pool = require("../config/database");


const getTenant = async () => {
    const [result] = await pool.query("SELECT * FROM tenants");
    return result;
};

const getTenantByID = async (id) => {
    const [result] = await pool.query(
        "SELECT * FROM tenants WHERE tenant_id = ?",
        [id]
    );

    return result[0];
};

const createTenant = async (body) => {
    const {
        user_id,
        fullname,
        phone,
        telegram,
        id_card,
        address
    } = body;

    const [result] = await pool.query(
        `INSERT INTO tenants
        (user_id, fullname, phone, telegram, id_card, address)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, fullname, phone, telegram, id_card, address]
    );

    return result;
};

const updateTenant = async (id, body) => {
    const {
        fullname,
        phone,
        telegram,
        id_card,
        address
    } = body;

    const [result] = await pool.query(
        `UPDATE tenants
         SET fullname = ?, phone = ?, telegram = ?, id_card = ?, address = ?
         WHERE tenant_id = ?`,
        [fullname, phone, telegram, id_card, address, id]
    );

    return result;
};

const deleteTenant = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM tenants WHERE tenant_id = ?",
        [id]
    );

    return result;
};

module.exports = {
    getTenant,
    getTenantByID,
    createTenant,
    updateTenant,
    deleteTenant
};