const { body, validationResult } = require('express-validator');

const CONSTANTS = require('./constants');

const { expressResponsesKit } = require('../../framework');

const validatorCallback = (req, res, next) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        next();
        return;
    }

    const normalizedErrorObjects = result.errors.map((el) => {
        return { code: el.msg, param: el.param };
    });

    expressResponsesKit.sendError(res, { codes: normalizedErrorObjects });
};

const validateProjectParams = () => {
    const FIELDS_VALIDATION_OPTIONS = CONSTANTS.FIELDS_VALIDATION_OPTIONS;

    const validationsSeries = [
        body('name')
            .isString()
            .withMessage(FIELDS_VALIDATION_OPTIONS.PROJECT_NAME.INVALID.ERROR_CODE)
            .isLength({ max: FIELDS_VALIDATION_OPTIONS.PROJECT_NAME.MAX_SIZE.VALUE })
            .withMessage(FIELDS_VALIDATION_OPTIONS.PROJECT_NAME.MAX_SIZE.ERROR_CODE)
    ];

    return [...validationsSeries, validatorCallback];
};

module.exports = {
    validateProjectParams
};
