const express = require('express');

const router = express.Router();

const { authController } = require('../controllers');
const { authValidator } = require('../validators');
const { authMiddleware } = require('../middlewares');

router.post('/regist', authValidator.validateRegistParams(), authMiddleware.checkEmailExistance, authController.regist);

module.exports = router;
