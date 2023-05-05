const Joi = require('joi');

exports.validatorRegisterToCourse = {
    body: Joi.object().keys({
        candidateName: Joi.string().required(),
        userId: Joi.string().required(),
        courseCode: Joi.string().required(),
    })
};