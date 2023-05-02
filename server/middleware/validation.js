const ResponseUtil = require('../utils/responseUtils');

const options = {
    basic: {
        abortEarly: false,
        convert: true,
    },
    array: {
        abortEarly: false,
        convert: true,
    },
};

exports.validationMiddleware = (schema) => (req, res, next) => {
    let message;
    Object.keys(schema).forEach((key) => {
        const { error } = schema[key].validate(req[key], options);
        if (error) {
            message = error.details[0].message || 'Invalid inputs';
            // const response = error.details[0];
            return ResponseUtil.validationErrorResponse(res, message);
        }
    });
    if (!message) next();
};
