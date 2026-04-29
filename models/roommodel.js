const pool = require("../config/database");


const getRoom = async () => {
    const [result] = await pool.query("SELECT * FROM rooms");
    return result;
};


const getRoomByID = async (id) => {
    const [result] = await pool.query(
        "SELECT * FROM rooms WHERE room_id = ?",
        [id]
    );
    return result[0];
};

const createRoom = async (body) => {
    const { room_number, price, status } = body;

    const [result] = await pool.query(
        "INSERT INTO rooms (room_number, price, status) VALUES (?, ?, ?)",
        [room_number, price, status || "Available"]
    );

    return result;
};


const updateRoom = async (id, body) => {
    const { room_number, price, status } = body;

    const [result] = await pool.query(
        `UPDATE rooms
         SET room_number = ?, price = ?, status = ?
         WHERE room_id = ?`,
        [room_number, price, status, id]
    );

    return result;
};


const deleteRoom = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM rooms WHERE room_id = ?",
        [id]
    );


};

module.exports = {
    getRoom,
    getRoomByID,
    createRoom,
    updateRoom,
    deleteRoom
};