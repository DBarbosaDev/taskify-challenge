const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const configs = require('../../configs');

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

const login = async (requesterIp = null, details = {}) => {
    const { _id, name, surname } = details;

    const tokenCreationPromise = new Promise((resolve, reject) => {
        jwt.sign({ _id, ipAddress: requesterIp }, configs.JWT_PRIVATE_KEY, { expiresIn: '24h' }, (err, token) => {
            if (err) {
                return reject(err);
            }
            return resolve(token);
        });
    });

    return {
        name,
        surname,
        token: await tokenCreationPromise
    };
};

module.exports = {
    regist,
    login
};
