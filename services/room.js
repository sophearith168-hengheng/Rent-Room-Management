const roomModel = require("../models/roommodel");

const getRoom = async () => {
    return await roomModel.getRoom();
};


const getRoomByID = async (id) => {
    if (!id) {
        throw new Error("Room ID is required");
    }

    const room = await roomModel.getRoomByID(id);

    if (!room) {
        throw new Error("Room not found");
    }

    return room;
};


const createRoom = async (body) => {
    const { room_number, price } = body;

    if (!room_number || !price) {
        throw new Error("Room number and price are required");
    }

    if (price <= 0) {
        throw new Error("Price must be greater than 0");
    }

    
    const data = await roomModel.createRoom(body);

 
    const id = data.insertId;

    const getbyID = await roomModel.getRoomByID(id);

    return getbyID;
};


const updateRoom = async (id, body) => {
    if (!id) {
        throw new Error("Room ID is required");
    }

    const room = await roomModel.getRoomByID(id);

    if (!room) {
        throw new Error("Room not found");
    }


    const result = await roomModel.updateRoom(id, body);


    if (result.affectedRows === 0) {
        throw new Error("Update failed");
    }

    const data = await roomModel.getRoomByID(id);

    return data
};


const deleteRoom = async (id) => {
    if (!id) {
        throw new Error("Room ID is required");
    }

    const room = await roomModel.getRoomByID(id);

    if (!room) {
        throw new Error("Room not found");
    }

    if (room.status === "Occupied") {
        throw new Error("Cannot delete occupied room");
    }

    return await roomModel.deleteRoom(id);
};

module.exports = {
    getRoom,
    getRoomByID,
    createRoom,
    updateRoom,
    deleteRoom
};