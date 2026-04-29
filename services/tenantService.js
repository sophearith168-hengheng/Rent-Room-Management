const tenantModel = require("../models/tenantModel");

// Get all tenants
const getTenant = async () => {
    return await tenantModel.getTenant();
};

// Get tenant by ID
const getTenantByID = async (id) => {
    if (!id) {
        throw new Error("Tenant ID is required");
    }

    const tenant = await tenantModel.getTenantByID(id);

    if (!tenant) {
        throw new Error("Tenant not found");
    }

    return tenant;
};

// Create tenant
const createTenant = async (body) => {
    const { user_id, fullname } = body;

    if (!user_id || !fullname) {
        throw new Error("User ID and fullname are required");
    }

    const data = await tenantModel.createTenant(body);

    if (!data.insertId) {
        throw new Error("Create tenant failed");
    }

    return await tenantModel.getTenantByID(data.insertId);
};

// Update tenant
const updateTenant = async (id, body) => {
    if (!id) {
        throw new Error("Tenant ID is required");
    }

    const tenant = await tenantModel.getTenantByID(id);

    if (!tenant) {
        throw new Error("Tenant not found");
    }

    const result = await tenantModel.updateTenant(id, body);

    if (result.affectedRows === 0) {
        throw new Error("Update failed");
    }

    return await tenantModel.getTenantByID(id);
};

// Delete tenant
const deleteTenant = async (id) => {
    if (!id) {
        throw new Error("Tenant ID is required");
    }

    const tenant = await tenantModel.getTenantByID(id);

    if (!tenant) {
        throw new Error("Tenant not found");
    }

    return await tenantModel.deleteTenant(id);
};

module.exports = {
    getTenant,
    getTenantByID,
    createTenant,
    updateTenant,
    deleteTenant
};