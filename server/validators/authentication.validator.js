const Joi = require('joi');

exports.validateLogin = {
    body: Joi.object().keys({
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
        password: Joi.string().required()
    })
};