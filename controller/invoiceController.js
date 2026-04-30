const invoiceService = require("../services/invoiceService");

const getInvoices = async (req, res) => {
    try {
        const result = await invoiceService.getInvoices();

        return res.json({
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getInvoiceByID = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await invoiceService.getInvoiceByID(id);

        return res.json({
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const createInvoice = async (req, res) => {
    try {
        const result = await invoiceService.createInvoice(req.body);

        return res.json({
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateInvoice = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await invoiceService.updateInvoice(id, req.body);

        return res.json({
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteInvoice = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await invoiceService.deleteInvoice(id);

        return res.json({
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getInvoices,
    getInvoiceByID,
    createInvoice,
    updateInvoice,
    deleteInvoice
};