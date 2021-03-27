const { expressResponsesKit } = require('../../framework');

const { authService } = require('../services');

const regist = async (req, res) => {
    try {
        await authService.regist(req.body);

        return expressResponsesKit.sendSuccessWithoutContent(res);
    }
    catch (error) {
        const stackTrace = {};
        Error.captureStackTrace(stackTrace);

        return expressResponsesKit.sendInternalServerError(
            res, { stack: String(stackTrace.stack), message: error.message }
        );
    }
};

module.exports = {
    regist
};
