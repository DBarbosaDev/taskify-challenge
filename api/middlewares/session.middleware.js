const jwt = require('jsonwebtoken');

const configs = require('../../configs');

const { ERROR_CODES_CONSTANTS, expressResponsesKit, expressRequestsKit } = require('../../framework');

const checkBearerTokenVeracity = async (req, res, next) => {
    const token = expressRequestsKit.getBearerToken(req);

    if (!token) {
        expressResponsesKit.sendError(res, { code: ERROR_CODES_CONSTANTS.BEARER_TOKEN_REQUIRED });
        return;
    }

    const requesterIp = expressRequestsKit.getRequesterIp(req);

    const tokenVerificationPromise = new Promise((resolve, reject) => {
        jwt.verify(token, configs.JWT_PRIVATE_KEY, (err, decodedToken) => {
            if (err) {
                return reject(err);
            }

            return resolve(decodedToken);
        });
    });

    try {
        const decodedToken = await tokenVerificationPromise;

        if (decodedToken.ipAddress !== requesterIp) {
            expressResponsesKit.sendUnauthorizedError(res, { code: ERROR_CODES_CONSTANTS.INVALID_BEARER_TOKEN });
            return;
        }
    }
    catch (error) {
        expressResponsesKit.sendUnauthorizedError(res, { message: error.message, code: ERROR_CODES_CONSTANTS.INVALID_BEARER_TOKEN });
        return;
    }

    next();
};

module.exports = {
    checkBearerTokenVeracity
};
