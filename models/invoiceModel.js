const pool = require("../config/database");

const getInvoices = async () => {
    const [result] = await pool.query(`
        SELECT 
            i.invoice_id,
            i.payment_id,
            i.invoice_number,
            i.issue_date,

            p.amount,
            p.payment_method,
            p.payment_date,
            p.status AS payment_status,

            t.fullname,
            r.room_number

        FROM invoices i
        JOIN payments p ON i.payment_id = p.payment_id
        JOIN tenants t ON p.tenant_id = t.tenant_id
        JOIN rooms r ON p.room_id = r.room_id
        ORDER BY i.issue_date DESC
    `);

    return result;
};

const getInvoiceByID = async (id) => {
    const [result] = await pool.query(`
        SELECT 
            i.invoice_id,
            i.payment_id,
            i.invoice_number,
            i.issue_date,

            p.amount,
            p.payment_method,
            p.payment_date,
            p.status AS payment_status,

            t.fullname,
            r.room_number

        FROM invoices i
        JOIN payments p ON i.payment_id = p.payment_id
        JOIN tenants t ON p.tenant_id = t.tenant_id
        JOIN rooms r ON p.room_id = r.room_id
        WHERE i.invoice_id = ?
    `, [id]);

    return result[0];
};

const createInvoice = async (body) => {
    const {
        payment_id,
        invoice_number,
        issue_date
    } = body;

    const [result] = await pool.query(`
        INSERT INTO invoices (
            payment_id,
            invoice_number,
            issue_date
        )
        VALUES (?, ?, ?)
    `, [
        payment_id,
        invoice_number,
        issue_date || new Date()
    ]);

    return result;
};

const updateInvoice = async (id, body) => {
    const {
        invoice_number,
        issue_date
    } = body;

    const [result] = await pool.query(`
        UPDATE invoices
        SET 
            invoice_number = ?,
            issue_date = ?
        WHERE invoice_id = ?
    `, [
        invoice_number,
        issue_date,
        id
    ]);

    return result;
};


const deleteInvoice = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM invoices WHERE invoice_id = ?",
        [id]
    );

    return result;
};

module.exports = {
    getInvoices,
    getInvoiceByID,
    createInvoice,
    updateInvoice,
    deleteInvoice
};