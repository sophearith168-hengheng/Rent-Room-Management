const pool = require("../config/database");

const getBills = async () => {
    const [result] = await pool.query(`
        SELECT * FROM utility_bills
    `);
    return result;
};


const getBillByID = async (id) => {
    const [result] = await pool.query(
        "SELECT * FROM utility_bills WHERE bill_id = ?",
        [id]
    );
    return result[0];
};


const createBill = async (body) => {
    const {
        room_id,
        tenant_id,
        month,
        electricity_unit,
        electricity_price,
        electricity_total,
        water_unit,
        water_price,
        water_total,
        garbage_fee,
        total_amount
    } = body;

    const [result] = await pool.query(`
        INSERT INTO utility_bills (
            room_id,
            tenant_id,
            month,
            electricity_unit,
            electricity_price,
            electricity_total,
            water_unit,
            water_price,
            water_total,
            garbage_fee,
            total_amount
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        room_id,
        tenant_id,
        month,
        electricity_unit,
        electricity_price,
        electricity_total,
        water_unit,
        water_price,
        water_total,
        garbage_fee,
        total_amount
    ]);

    return result;
};


const updateBill = async (id, body) => {
    const {
        electricity_unit,
        electricity_price,
        electricity_total,
        water_unit,
        water_price,
        water_total,
        garbage_fee,
        total_amount,
        status
    } = body;

    const [result] = await pool.query(`
        UPDATE utility_bills
        SET
            electricity_unit = ?,
            electricity_price = ?,
            electricity_total = ?,
            water_unit = ?,
            water_price = ?,
            water_total = ?,
            garbage_fee = ?,
            total_amount = ?,
            status = ?
        WHERE bill_id = ?
    `, [
        electricity_unit,
        electricity_price,
        electricity_total,
        water_unit,
        water_price,
        water_total,
        garbage_fee,
        total_amount,
        status,
        id
    ]);

    return result;
};


const deleteBill = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM utility_bills WHERE bill_id = ?",
        [id]
    );

    return result;
};

module.exports = {
    getBills,
    getBillByID,
    createBill,
    updateBill,
    deleteBill
};