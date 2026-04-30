const pool = require("../config/database");

const getPayments = async () => {
    const [result] = await pool.query(`
        SELECT 
            p.payment_id,
            p.tenant_id,
            t.fullname,
            p.room_id,
            r.room_number,
            p.bill_id,
            p.amount,
            p.payment_method,
            p.payment_date,
            p.due_date,
            p.status,
            p.proof_image
        FROM payments p
        JOIN tenants t ON p.tenant_id = t.tenant_id
        JOIN rooms r ON p.room_id = r.room_id
        ORDER BY p.payment_date DESC
    `);

    return result;
};


const getPaymentByID = async (id) => {
    const [result] = await pool.query(`
        SELECT 
            p.payment_id,
            p.tenant_id,
            t.fullname,
            p.room_id,
            r.room_number,
            p.bill_id,
            p.amount,
            p.payment_method,
            p.payment_date,
            p.due_date,
            p.status,
            p.proof_image
        FROM payments p
        JOIN tenants t ON p.tenant_id = t.tenant_id
        JOIN rooms r ON p.room_id = r.room_id
        WHERE p.payment_id = ?
    `, [id]);

    return result[0];
};


const createPayment = async (body) => {
    const {
        tenant_id,
        room_id,
        bill_id,
        amount,
        payment_method,
        payment_date,
        due_date,
        status,
        proof_image
    } = body;

    const [result] = await pool.query(`
        INSERT INTO payments (
            tenant_id,
            room_id,
            bill_id,
            amount,
            payment_method,
            payment_date,
            due_date,
            status,
            proof_image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        tenant_id,
        room_id,
        bill_id || null,
        amount,
        payment_method || "Cash",
        payment_date || new Date(),
        due_date || null,
        status || "Pending",
        proof_image || null
    ]);

    return result;
};


const updatePayment = async (id, body) => {
    const {
        amount,
        payment_method,
        payment_date,
        due_date,
        status,
        proof_image
    } = body;

    const [result] = await pool.query(`
        UPDATE payments
        SET 
            amount = ?,
            payment_method = ?,
            payment_date = ?,
            due_date = ?,
            status = ?,
            proof_image = ?
        WHERE payment_id = ?
    `, [
        amount,
        payment_method,
        payment_date,
        due_date,
        status,
        proof_image,
        id
    ]);

    return result;
};


const deletePayment = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM payments WHERE payment_id = ?",
        [id]
    );

    return result;
};

module.exports = {
    getPayments,
    getPaymentByID,
    createPayment,
    updatePayment,
    deletePayment
};