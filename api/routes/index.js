const express = require('express');

const router = express.Router();

const userRoutes = require('./user.route');

router.use(userRoutes);

module.exports = router;
