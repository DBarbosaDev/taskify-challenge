const express = require('express');

const router = express.Router();

const userRoutes = require('./user.route');
const { sessionMiddleware } = require('../middlewares');

router.use(userRoutes);

router.use(sessionMiddleware.checkBearerTokenVeracity);

// Routes that requires authentication e session validation, goes above.

module.exports = router;
