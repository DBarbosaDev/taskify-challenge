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

module.exports = {
    checkEmailExistance
};
