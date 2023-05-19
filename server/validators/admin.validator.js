const Joi = require('joi');

exports.validateCreateAdmin = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        role: Joi.string().required(),
        userName: Joi.string().min(4).max(20).required(),
        password: Joi.string().min(7).max(12).required(),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional()
    })
};

exports.validateUpdate = {
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
    body: Joi.object().keys({
        name: Joi.string().optional(),
        role: Joi.string().optional(),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }).optional()
    })
}

exports.validateDelete = {
    params: Joi.object().keys({
        id: Joi.string().required()
    })
}