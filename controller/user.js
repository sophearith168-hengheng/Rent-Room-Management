const userService = require('../services/user');
const authservice = require('../services/auth')


const getUser = async (req, res) => {
    try {
        const result = await userService.getUser();

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

const getUserByID = async (req, res) => {
    try {
        const result = await userService.getUserbyID(id);

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

const updateuser = async (req, res) => {
    try {
        const result = await userService.updateuser(id,body);

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

const deleteuser = async (req, res) => {
    try {
        const result = await userService.deleteuser(id);

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


const createTenantByAdmin = async (req, res) => {
    try {
        const result = await userService.createTenantByAdmin(req.body);

        return res.json({
            success: true,
            message: "Create Successfully",
            data: result
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        let result = await authservice.login(req.body)

        res.json({
            result : true,
            data : result
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            result : false,
            msg : error.message
        })
    }
}

module.exports = {
    getUser,
    createTenantByAdmin,
    login,
    updateuser,
    deleteuser,
    getUserByID
};