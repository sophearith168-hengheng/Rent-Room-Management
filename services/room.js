const roomModel = require('../models/roommodel')


const getRoom = async () =>{
   try {
        const result = await roomModel.getRoom();
        return result;
    } catch (error) {
        console.log("Service ERROR:", error);
        throw error;
    }
}



module.exports = {
    getRoom
}