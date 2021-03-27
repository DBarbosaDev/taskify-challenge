const bcrypt = require('bcrypt');

const UserModel = require('../models/user.model');
const { ERROR_CODES_CONSTANTS, expressResponsesKit } = require('../../framework');

const checkEmailExistance = async (req, res, next) => {
    const user = await UserModel.getUserByEmail(req.body.email);

    if (user) {
        expressResponsesKit.sendError(res, { code: ERROR_CODES_CONSTANTS.EMAIL_ALREADY_EXISTS });
        return;
    }

    next();
};

const checkLoginParams = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await UserModel.getUserByEmail(email);

    if (!user) {
        expressResponsesKit.sendError(res, { code: ERROR_CODES_CONSTANTS.USER_NOT_EXISTS });
        return;
    }

    if (!(await bcrypt.compare(password, user.password || ''))) {
        expressResponsesKit.sendError(res, { code: ERROR_CODES_CONSTANTS.WRONG_PASSWORD });
        return;
    }

    res.locals.userDetails = user;

    next();
};

module.exports = {
    checkEmailExistance,
    checkLoginParams
};
