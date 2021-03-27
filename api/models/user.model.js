const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    surname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { collection: 'users' });

const UserModel = mongoose.model('UserModel', UserModelSchema);

const createUser = (userDetails = {}) => UserModel.create(userDetails);

const getUserByEmail = (userEmail) => UserModel.findOne({ email: userEmail }).exec();

module.exports = {
    createUser,
    getUserByEmail
};
