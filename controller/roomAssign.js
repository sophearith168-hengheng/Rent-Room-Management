const assignmentService = require("../services/roomAssignmentService");


const getAssignments = async (req, res) => {
    try {
        const result = await assignmentService.getAssignments();

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


const getAssignmentByID = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await assignmentService.getAssignmentByID(id);

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


const createAssignment = async (req, res) => {
    try {
        const result = await assignmentService.createAssignment(req.body);

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


const updateAssignment = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await assignmentService.updateAssignment(id, req.body);

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


const deleteAssignment = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await assignmentService.deleteAssignment(id);

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
    getAssignments,
    getAssignmentByID,
    createAssignment,
    updateAssignment,
    deleteAssignment
};