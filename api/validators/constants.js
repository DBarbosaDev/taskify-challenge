const { ERROR_CODES_CONSTANTS } = require('../../framework');

module.exports = {
    FIELDS_VALIDATION_OPTIONS: {
        NAME: {
            MAX_SIZE: {
                VALUE: 25,
                ERROR_CODE: ERROR_CODES_CONSTANTS.NAME_MAX_SIZE_25_EXCEEDED
            },
            INVALID: {
                ERROR_CODE: ERROR_CODES_CONSTANTS.INVALID_NAME_STRING
            }
        },
        SURNAME: {
            MAX_SIZE: {
                VALUE: 25,
                ERROR_CODE: ERROR_CODES_CONSTANTS.SURNAME_MAX_SIZE_25_EXCEEDED
            },
            INVALID: {
                ERROR_CODE: ERROR_CODES_CONSTANTS.INVALID_SURNAME_STRING
            }
        },
        EMAIL: {
            MAX_SIZE: {
                VALUE: 40,
                ERROR_CODE: ERROR_CODES_CONSTANTS.EMAIL_MAX_SIZE_40_EXCEEDED
            },
            INVALID: {
                ERROR_CODE: ERROR_CODES_CONSTANTS.INVALID_EMAIL
            }
        },
        PASSWORD: {
            MAX_SIZE: {
                VALUE: 40,
                ERROR_CODE: ERROR_CODES_CONSTANTS.PASSWORD_MAX_SIZE_40_EXCEEDED
            },
            REQUIRED: {
                ERROR_CODE: ERROR_CODES_CONSTANTS.PASSWORD_REQUIRED
            }
        },
        PROJECT_NAME: {
            MAX_SIZE: {
                VALUE: 1024,
                ERROR_CODE: ERROR_CODES_CONSTANTS.PROJECT_NAME_MAX_SIZE_1024_EXCEEDED
            },
            INVALID: {
                ERROR_CODE: ERROR_CODES_CONSTANTS.INVALID_PROJECT_NAME_STRING
            },
            REQUIRED: {
                ERROR_CODE: ERROR_CODES_CONSTANTS.PROJECT_NAME_REQUIRED
            }
        },
        PROJECT_ID: {
            REQUIRED: {
                ERROR_CODE: ERROR_CODES_CONSTANTS.PROJECT_ID_REQUIRED
            },
            OBJECT_ID: {
                ERROR_CODE: ERROR_CODES_CONSTANTS.INVALID_OBJECT_ID
            }
        },
        TASK_ID: {
            REQUIRED: {
                ERROR_CODE: ERROR_CODES_CONSTANTS.TASK_ID_REQUIRED
            },
            OBJECT_ID: {
                ERROR_CODE: ERROR_CODES_CONSTANTS.INVALID_OBJECT_ID
            }
        },
        DESCRIPTION: {
            REQUIRED: {
                ERROR_CODE: ERROR_CODES_CONSTANTS.TASK_DESCRIPTION_REQUIRED
            },
            MAX_SIZE: {
                VALUE: 2068,
                ERROR_CODE: ERROR_CODES_CONSTANTS.TASK_DESCRIPTION_MAX_SIZE_2068_EXCEEDED
            }
        }
    }
};
