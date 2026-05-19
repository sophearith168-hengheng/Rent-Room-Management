const userModel = require("../models/user");
const bcrypt = require("bcryptjs");


const getUser = async () => {
    return await userModel.getUser();
};

const getUserbyID = async (id) =>{
    return await userModel.findById(id);
}

const updateuser = async (id, body) => {
    const { username, email, password } = body;

    const existingUser = await userModel.getUserByID(id);
    if (existingUser.length === 0) {
        throw new Error("User not found");
    }

    let hashedPassword = null;

    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateData = {
        username: username || existingUser[0].username,
        email: email || existingUser[0].email,
        password: hashedPassword || existingUser[0].password
    };

    const result = await userModel.updateUser(id, updateData);

    return result;
};


const deleteuser = async (id) =>{
    return await userModel.deleteuser(id);
}

const createTenantByAdmin = async (body) => {
    const { username, email, password } = body;

    const existing = await userModel.checkemail(email);
    if (existing.length > 0) {
        throw new Error("Email is already used");
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const userId = await userModel.createTenantByAdmin({
        username,
        email,
        password: hashedPassword,
        role: "Admin"
    });


    const user = await userModel.getUserByID(userId);

    return user;
};

module.exports = {
    getUser,
    createTenantByAdmin,
    updateuser,
    deleteuser,
    getUserbyID
};