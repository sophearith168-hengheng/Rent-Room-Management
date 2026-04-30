const paymentService = require("../services/paymentService");


const getPayments = async (req, res) => {
    try {
        const result = await paymentService.getPayments();

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

const getPaymentByID = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await paymentService.getPaymentByID(id);

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


const createPayment = async (req, res) => {
    try {
        const result = await paymentService.createPayment(req.body);

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


const updatePayment = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await paymentService.updatePayment(id, req.body);

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


const deletePayment = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await paymentService.deletePayment(id);

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
    getPayments,
    getPaymentByID,
    createPayment,
    updatePayment,
    deletePayment
};