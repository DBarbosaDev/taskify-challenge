const removeUndefinedFields = (object) => {
    Object.keys(object).forEach((key) => {
        if (object[key] === undefined) {
            delete object[key];
        }
    });
};

module.exports = {
    removeUndefinedFields
};
