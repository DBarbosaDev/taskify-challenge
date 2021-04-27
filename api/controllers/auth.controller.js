const { expressRequestsKit, expressResponsesKit } = require('../../framework');

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

const login = async (req, res) => {
    try {
        const requesterIp = expressRequestsKit.getRequesterIp(req);
        const details = await authService.login(requesterIp, res.locals.userDetails);

        return expressResponsesKit.sendSuccess(res, details);
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
    regist,
    login
};
