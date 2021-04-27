const authMiddleware = require('./auth.middleware');
const sessionMiddleware = require('./session.middleware');

module.exports = {
    authMiddleware,
    sessionMiddleware
};
