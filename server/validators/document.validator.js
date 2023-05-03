const Joi = require('joi');

exports.validateDocumentCreate = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        userId: Joi.string().required()
    })
};