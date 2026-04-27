const userModel = require("../models/user");
const bcrypt = require("bcryptjs");


const getUser = async () => {
    return await userModel.getUser();
};


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
        role: "Tenant"
    });


    const user = await userModel.getUserByID(userId);

    return user;
};

module.exports = {
    getUser,
    createTenantByAdmin
};