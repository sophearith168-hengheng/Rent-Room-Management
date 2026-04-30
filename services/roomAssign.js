const assignmentModel = require("../models/roomassign");


const getAssignments = async () => {
    return await assignmentModel.getAssignments();
};


const getAssignmentByID = async (id) => {
    if (!id) {
        throw new Error("Assignment ID is required");
    }

    const data = await assignmentModel.getAssignmentByID(id);

    if (!data) {
        throw new Error("Assignment not found");
    }

    return data;
};


const createAssignment = async (body) => {
    const {
        room_id,
        tenant_id,
        start_date
    } = body;

    if (!room_id || !tenant_id || !start_date) {
        throw new Error("room_id, tenant_id and start_date are required");
    }

    const result = await assignmentModel.createAssignment(body);

    if (!result.insertId) {
        throw new Error("Failed to create assignment");
    }

    return await assignmentModel.getAssignmentByID(result.insertId);
};


const updateAssignment = async (id, body) => {
    if (!id) {
        throw new Error("Assignment ID is required");
    }

    const existing = await assignmentModel.getAssignmentByID(id);

    if (!existing) {
        throw new Error("Assignment not found");
    }

    const result = await assignmentModel.updateAssignment(id, body);

    if (result.affectedRows === 0) {
        throw new Error("Update failed");
    }

    return await assignmentModel.getAssignmentByID(id);
};

const deleteAssignment = async (id) => {
    if (!id) {
        throw new Error("Assignment ID is required");
    }

    const existing = await assignmentModel.getAssignmentByID(id);

    if (!existing) {
        throw new Error("Assignment not found");
    }

    return await assignmentModel.deleteAssignment(id);
};

module.exports = {
    getAssignments,
    getAssignmentByID,
    createAssignment,
    updateAssignment,
    deleteAssignment
};