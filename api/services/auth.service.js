const bcrypt = require('bcrypt');

const UserModel = require('../models/user.model');

const regist = async (details) => {
    const {
        name,
        surname,
        email,
        password
    } = details;

    const user = await UserModel.createUser({
        name,
        surname,
        email,
        password: await bcrypt.hash(password, 12)
    });

    return user;
};

module.exports = {
    regist
};
