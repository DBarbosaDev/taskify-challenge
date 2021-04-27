const ERROR_CODES_CONSTANTS = require('./constants/errorCodes.constants');

const expressResponsesKit = require('./kits/expressResponses.kit');
const expressRequestsKit = require('./kits/expressRequests.kit');

module.exports = {
    ERROR_CODES_CONSTANTS,

    expressRequestsKit,
    expressResponsesKit
};
