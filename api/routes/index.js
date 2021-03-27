const express = require('express');

const router = express.Router();

const authRoutes = require('./auth.route');
const { sessionMiddleware } = require('../middlewares');

router.use(authRoutes);

router.use(sessionMiddleware.checkBearerTokenVeracity);

// Routes that requires authentication e session validation, goes above.

module.exports = router;
