const Joi = require('joi');

exports.validatorRegisterToCourse = {
    body: Joi.object().keys({
        candidateName: Joi.string().required(),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in', 'org'] } }).optional()
        .messages({ 'string.email': 'Email domain not supported, Supported domains are .com, .net, .in, .org' }),
        courseId: Joi.string().required(),
    })
};