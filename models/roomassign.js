const pool = require("../config/database");


const assignRoom = async (body) => {
    const { room_id, tenant_id, start_date } = body;

   
    const [check] = await pool.query(
        "SELECT * FROM room_assignments WHERE room_id = ? AND status = 'Active'",
        [room_id]
    );

    if (check.length > 0) {
        throw new Error("Room already occupied");
    }


    const [result] = await pool.query(
        `INSERT INTO room_assignments (room_id, tenant_id, start_date)
         VALUES (?, ?, ?)`,
        [room_id, tenant_id, start_date]
    );

    await pool.query(
        "UPDATE rooms SET status = 'Occupied' WHERE room_id = ?",
        [room_id]
    );

    return result;
};


const endAssignment = async (assignment_id, end_date) => {

    const [assignment] = await pool.query(
        "SELECT room_id FROM room_assignments WHERE assignment_id = ?",
        [assignment_id]
    );

    if (assignment.length === 0) {
        throw new Error("Assignment not found");
    }

    const room_id = assignment[0].room_id;


    await pool.query(
        `UPDATE room_assignments
         SET status = 'Ended', end_date = ?
         WHERE assignment_id = ?`,
        [end_date, assignment_id]
    );


    await pool.query(
        "UPDATE rooms SET status = 'Available' WHERE room_id = ?",
        [room_id]
    );
};

const getAssignments = async () => {
    const [result] = await pool.query(`
        SELECT
            ra.assignment_id,
            r.room_number,
            t.tenant_name,
            ra.start_date,
            ra.end_date,
            ra.status
        FROM room_assignments ra
        JOIN rooms r ON ra.room_id = r.room_id
        JOIN tenants t ON ra.tenant_id = t.tenant_id
    `);

    return result;
};

module.exports = {
    assignRoom,
    endAssignment,
    getAssignments
};