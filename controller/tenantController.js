const tenantService = require("../services/tenantService");

const getTenant = async (req, res) => {
    try {
        const result = await tenantService.getTenant();

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

const getTenantByID = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await tenantService.getTenantByID(id);

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


const createTenant = async (req, res) => {
    try {
        const result = await tenantService.createTenant(req.body);

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

const updateTenant = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await tenantService.updateTenant(id, req.body);

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


const deleteTenant = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await tenantService.deleteTenant(id);

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
    getTenant,
    getTenantByID,
    createTenant,
    updateTenant,
    deleteTenant
};