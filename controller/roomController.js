const roomService = require('../services/room')



const getRoom = async (req, res) => {
    try {
        const result = await roomService.getRoom();

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
}


module.exports = {
    getRoom
}