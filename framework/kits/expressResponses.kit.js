const configs = require('../../configs');

const sendResponse = (expressResponse, statusCode, details = {}) => {
    const { data, error } = details;
    const { codes, code, provider, message, stack } = error || {};

    const responseObject = {
        sucess: !error,
        status: statusCode,
        error: error ? { codes, code, message, provider } : undefined,
        data
    };

    if (statusCode === 500 && error && configs.RUNNING_MODE !== 'production') {
        responseObject.error.stack = stack;
    }

    expressResponse.status(responseObject.status).json(responseObject);
};

const sendSuccessWithoutContent = (expressResponse) => {
    sendResponse(expressResponse, 204);
};

/**
 * Submit an express response of success type
 * @param {Object} expressResponse Express Response dependency
 * @param {Object} data Object with data
 */
const sendSuccess = (expressResponse, data) => {
    sendResponse(expressResponse, 200, { data });
};

/**
 * Submit an express response of error type
 * @param {Object} expressResponse Express Response dependency
 * @param {Object} errorDetails Object with the error details
 * @param {String} errorDetails.code Error code
 * @param {String} errorDetails.stack Error stack trace
 * @param {String | Object} errorDetails.message Error message
 */
const sendError = (expressResponse, errorDetails) => {
    sendResponse(expressResponse, 400, { error: errorDetails });
};

/**
 * Submit an express response of unauthorized type
 * @param {Object} expressResponse Express Response dependency
 * @param {Object} errorDetails Object with the error details
 * @param {String} errorDetails.code Error code
 * @param {String} errorDetails.stack Error stack trace
 * @param {String | Object} errorDetails.message Error message
 */
const sendUnauthorizedError = (expressResponse, errorDetails) => {
    sendResponse(expressResponse, 401, { error: errorDetails });
};

/**
 * Submit an express response of forbidden type
 * @param {Object} expressResponse Express Response dependency
 * @param {Object} errorDetails Object with the error details
 * @param {String} errorDetails.code Error code
 * @param {String} errorDetails.stack Error stack trace
 * @param {String | Object} errorDetails.message Error message
 */
const sendForbiddenError = (expressResponse, errorDetails) => {
    sendResponse(expressResponse, 403, { error: errorDetails });
};

/**
 * Submit an express response of pre-requirements failure type
 * @param {Object} expressResponse Express Response dependency
 * @param {Object} errorDetails Object with the error details
 * @param {String} errorDetails.code Error code
 * @param {String} errorDetails.stack Error stack trace
 * @param {String | Object} errorDetails.message Error message
 */
const sendPreRequirementsFailureError = (expressResponse, errorDetails) => {
    sendResponse(expressResponse, 412, { error: errorDetails });
};

/**
 * Submit an express response of internal server error type
 * @param {Object} expressResponse Express Response dependency
 * @param {Object} errorDetails Object with the error details
 * @param {String} errorDetails.code Error code
 * @param {String} errorDetails.stack Error stack trace
 * @param {String | Object} errorDetails.message Error message
 */
const sendInternalServerError = (expressResponse, errorDetails) => {
    sendResponse(expressResponse, 500, { error: errorDetails });
};

module.exports = {
    // status code 2xx
    sendSuccessWithoutContent,
    sendSuccess,

    // status code 4xx
    sendError,
    sendUnauthorizedError,
    sendForbiddenError,
    sendPreRequirementsFailureError,

    // status code 5xx
    sendInternalServerError
};
