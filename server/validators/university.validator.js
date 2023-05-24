const Joi = require('joi');

exports.validateUniversityCreate = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        universityCode: Joi.string().required(),
        address: Joi.string().required(),
        countryId: Joi.string().required(),
        adminId: Joi.string().required()
    })
};

exports.validateFilterUniversity = {
    query: Joi.object().keys({
        countryId: Joi.string().required(),
        page: Joi.number().optional(),
        limit: Joi.number().optional()
    })
};