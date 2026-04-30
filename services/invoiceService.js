const invoiceModel = require("../models/invoiceModel");


const getInvoices = async () => {
    return await invoiceModel.getInvoices();
};


const getInvoiceByID = async (id) => {
    if (!id) {
        throw new Error("Invoice ID is required");
    }

    const data = await invoiceModel.getInvoiceByID(id);

    if (!data) {
        throw new Error("Invoice not found");
    }

    return data;
};


const createInvoice = async (body) => {
    const {
        payment_id,
        invoice_number,
        issue_date
    } = body;

   
    if (!payment_id || !invoice_number) {
        throw new Error("payment_id and invoice_number are required");
    }

   
    if (!invoice_number.startsWith("INV")) {
        throw new Error("Invoice number must start with INV");
    }

    const result = await invoiceModel.createInvoice({
        payment_id,
        invoice_number,
        issue_date: issue_date || new Date()
    });

    if (!result.insertId) {
        throw new Error("Failed to create invoice");
    }

    return await invoiceModel.getInvoiceByID(result.insertId);
};


const updateInvoice = async (id, body) => {
    if (!id) {
        throw new Error("Invoice ID is required");
    }

    const existing = await invoiceModel.getInvoiceByID(id);

    if (!existing) {
        throw new Error("Invoice not found");
    }

    const {
        invoice_number,
        issue_date
    } = body;

    if (invoice_number && !invoice_number.startsWith("INV")) {
        throw new Error("Invoice number must start with INV");
    }

    const result = await invoiceModel.updateInvoice(id, {
        invoice_number: invoice_number || existing.invoice_number,
        issue_date: issue_date || existing.issue_date
    });

    if (result.affectedRows === 0) {
        throw new Error("Update failed");
    }

    return await invoiceModel.getInvoiceByID(id);
};


const deleteInvoice = async (id) => {
    if (!id) {
        throw new Error("Invoice ID is required");
    }

    const existing = await invoiceModel.getInvoiceByID(id);

    if (!existing) {
        throw new Error("Invoice not found");
    }

    return await invoiceModel.deleteInvoice(id);
};

module.exports = {
    getInvoices,
    getInvoiceByID,
    createInvoice,
    updateInvoice,
    deleteInvoice
};