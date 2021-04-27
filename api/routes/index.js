const express = require('express');

const router = express.Router();

const { sessionMiddleware } = require('../middlewares');

const authRoutes = require('./auth.route');
const projectsRoutes = require('./projects.route');

router.use(authRoutes);

router.use(sessionMiddleware.checkBearerTokenVeracity);

// Routes that requires authentication e session validation, goes above.
router.use(projectsRoutes);

module.exports = router;
