const { body, param, validationResult } = require('express-validator');
const mongoose = require('mongoose');

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
            .not()
            .isEmpty()
            .withMessage(FIELDS_VALIDATION_OPTIONS.PROJECT_NAME.REQUIRED.ERROR_CODE)
            .isLength({ max: FIELDS_VALIDATION_OPTIONS.PROJECT_NAME.MAX_SIZE.VALUE })
            .withMessage(FIELDS_VALIDATION_OPTIONS.PROJECT_NAME.MAX_SIZE.ERROR_CODE)
    ];

    return [...validationsSeries, validatorCallback];
};

const validateProjectIdParam = () => {
    const FIELDS_VALIDATION_OPTIONS = CONSTANTS.FIELDS_VALIDATION_OPTIONS;

    const validationsSeries = [
        param('id')
            .not().isEmpty()
            .withMessage(FIELDS_VALIDATION_OPTIONS.PROJECT_ID.REQUIRED.ERROR_CODE)
            .custom((id = '') => mongoose.Types.ObjectId.isValid(id))
            .withMessage(FIELDS_VALIDATION_OPTIONS.PROJECT_ID.OBJECT_ID.ERROR_CODE)
    ];

    return [...validationsSeries, validatorCallback];
};

const validateTaskIdParam = () => {
    const FIELDS_VALIDATION_OPTIONS = CONSTANTS.FIELDS_VALIDATION_OPTIONS;

    const validationsSeries = [
        param('taskId')
            .not().isEmpty()
            .withMessage(FIELDS_VALIDATION_OPTIONS.TASK_ID.REQUIRED.ERROR_CODE)
            .custom((id = '') => mongoose.Types.ObjectId.isValid(id))
            .withMessage(FIELDS_VALIDATION_OPTIONS.TASK_ID.OBJECT_ID.ERROR_CODE)
    ];

    return [...validationsSeries, validatorCallback];
};

const validateTaskParams = () => {
    const FIELDS_VALIDATION_OPTIONS = CONSTANTS.FIELDS_VALIDATION_OPTIONS;

    const validationsSeries = [
        body('description')
            .not().isEmpty()
            .withMessage(FIELDS_VALIDATION_OPTIONS.DESCRIPTION.REQUIRED.ERROR_CODE)
            .isLength({ max: FIELDS_VALIDATION_OPTIONS.DESCRIPTION.MAX_SIZE.VALUE })
            .withMessage(FIELDS_VALIDATION_OPTIONS.DESCRIPTION.MAX_SIZE.ERROR_CODE)
    ];

    return [...validationsSeries, validatorCallback];
};

module.exports = {
    validateProjectParams,
    validateProjectIdParam,
    validateTaskIdParam,
    validateTaskParams
};
