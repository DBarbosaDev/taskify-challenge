const bcrypt = require('bcrypt');

require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8080,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/taskifyDB?retryWrites=false',
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || bcrypt.genSaltSync(20),
    RUNNING_MODE: process.env.RUNNING_MODE || 'production',

    REDIS_URI: process.env.REDIS_URI || 'redis://127.0.0.1:6379'
};
