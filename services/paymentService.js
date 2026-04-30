const paymentModel = require("../models/paymentModel");


const getPayments = async () => {
    return await paymentModel.getPayments();
};


const getPaymentByID = async (id) => {
    if (!id) {
        throw new Error("Payment ID is required");
    }

    const data = await paymentModel.getPaymentByID(id);

    if (!data) {
        throw new Error("Payment not found");
    }

    return data;
};


const createPayment = async (body) => {
    const {
        tenant_id,
        room_id,
        amount,
        payment_method,
        bill_id,
        payment_date,
        due_date,
        proof_image
    } = body;


    if (!tenant_id || !room_id || !amount) {
        throw new Error("tenant_id, room_id, amount are required");
    }

    if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }

    const result = await paymentModel.createPayment({
        tenant_id,
        room_id,
        bill_id: bill_id || null,
        amount,
        payment_method: payment_method || "Cash",
        payment_date: payment_date || new Date(),
        due_date: due_date || null,
        status: "Pending", // default business rule
        proof_image: proof_image || null
    });

    if (!result.insertId) {
        throw new Error("Failed to create payment");
    }

    return await paymentModel.getPaymentByID(result.insertId);
};


const updatePayment = async (id, body) => {
    if (!id) {
        throw new Error("Payment ID is required");
    }

    const existing = await paymentModel.getPaymentByID(id);

    if (!existing) {
        throw new Error("Payment not found");
    }

    const {
        amount,
        payment_method,
        payment_date,
        due_date,
        status,
        proof_image
    } = body;

    
    if (amount && amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }

   
    const allowedStatus = ["Pending", "Confirmed", "Rejected"];
    if (status && !allowedStatus.includes(status)) {
        throw new Error("Invalid payment status");
    }

    const result = await paymentModel.updatePayment(id, {
        amount: amount || existing.amount,
        payment_method: payment_method || existing.payment_method,
        payment_date: payment_date || existing.payment_date,
        due_date: due_date || existing.due_date,
        status: status || existing.status,
        proof_image: proof_image || existing.proof_image
    });

    if (result.affectedRows === 0) {
        throw new Error("Update failed");
    }

    return await paymentModel.getPaymentByID(id);
};


const deletePayment = async (id) => {
    if (!id) {
        throw new Error("Payment ID is required");
    }

    const existing = await paymentModel.getPaymentByID(id);

    if (!existing) {
        throw new Error("Payment not found");
    }

    return await paymentModel.deletePayment(id);
};

module.exports = {
    getPayments,
    getPaymentByID,
    createPayment,
    updatePayment,
    deletePayment
};