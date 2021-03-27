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

const validateRegistParams = () => {
    const FIELDS_VALIDATION_OPTIONS = CONSTANTS.FIELDS_VALIDATION_OPTIONS;

    const validationsSeries = [
        body('name')
            .isString()
            .withMessage(FIELDS_VALIDATION_OPTIONS.NAME.INVALID.ERROR_CODE)
            .isLength({ max: FIELDS_VALIDATION_OPTIONS.NAME.MAX_SIZE.VALUE })
            .withMessage(FIELDS_VALIDATION_OPTIONS.NAME.MAX_SIZE.ERROR_CODE),

        body('surname')
            .isString()
            .withMessage(FIELDS_VALIDATION_OPTIONS.SURNAME.INVALID.ERROR_CODE)
            .isLength({ max: FIELDS_VALIDATION_OPTIONS.SURNAME.MAX_SIZE.VALUE })
            .withMessage(FIELDS_VALIDATION_OPTIONS.SURNAME.MAX_SIZE.ERROR_CODE)
            .optional({ nullable: true, checkFalsy: true }),

        body('email')
            .isEmail()
            .withMessage(FIELDS_VALIDATION_OPTIONS.EMAIL.INVALID.ERROR_CODE)
            .isLength({ max: FIELDS_VALIDATION_OPTIONS.EMAIL.MAX_SIZE.VALUE })
            .withMessage(FIELDS_VALIDATION_OPTIONS.EMAIL.MAX_SIZE.ERROR_CODE),

        body('password')
            .not().isEmpty()
            .withMessage(FIELDS_VALIDATION_OPTIONS.PASSWORD.REQUIRED.ERROR_CODE)
            .isLength({ max: FIELDS_VALIDATION_OPTIONS.PASSWORD.MAX_SIZE.VALUE })
            .withMessage(FIELDS_VALIDATION_OPTIONS.PASSWORD.MAX_SIZE.ERROR_CODE)
    ];

    return [...validationsSeries, validatorCallback];
};

module.exports = {
    validateRegistParams
};
