const billModel = require("../models/utilityBillModel");

const getBills = async () => {
    return await billModel.getBills();
};

const getBillByID = async (id) => {
    if (!id) {
        throw new Error("Bill ID is required");
    }

    const data = await billModel.getBillByID(id);

    if (!data) {
        throw new Error("Bill not found");
    }

    return data;
};


const createBill = async (body) => {
    const {
        room_id,
        tenant_id,
        month,
        electricity_unit = 0,
        electricity_price = 0,
        water_unit = 0,
        water_price = 0,
        garbage_fee = 0
    } = body;

    if (!room_id || !tenant_id || !month) {
        throw new Error("room_id, tenant_id, month are required");
    }

    const electricity_total = electricity_unit * electricity_price;
    const water_total = water_unit * water_price;

    const total_amount =
        electricity_total +
        water_total +
        garbage_fee;

    const data = await billModel.createBill({
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
    });

    return await billModel.getBillByID(data.insertId);
};

const updateBill = async (id, body) => {
    if (!id) {
        throw new Error("Bill ID is required");
    }

    const existing = await billModel.getBillByID(id);

    if (!existing) {
        throw new Error("Bill not found");
    }

    const {
        electricity_unit = 0,
        electricity_price = 0,
        water_unit = 0,
        water_price = 0,
        garbage_fee = 0,
        status
    } = body;

    const electricity_total = electricity_unit * electricity_price;
    const water_total = water_unit * water_price;

    const total_amount =
        electricity_total +
        water_total +
        garbage_fee;

    const result = await billModel.updateBill(id, {
        electricity_unit,
        electricity_price,
        electricity_total,
        water_unit,
        water_price,
        water_total,
        garbage_fee,
        total_amount,
        status
    });

    if (result.affectedRows === 0) {
        throw new Error("Update failed");
    }

    return await billModel.getBillByID(id);
};

const deleteBill = async (id) => {
    if (!id) {
        throw new Error("Bill ID is required");
    }

    const existing = await billModel.getBillByID(id);

    if (!existing) {
        throw new Error("Bill not found");
    }

    return await billModel.deleteBill(id);
};

module.exports = {
    getBills,
    getBillByID,
    createBill,
    updateBill,
    deleteBill
};