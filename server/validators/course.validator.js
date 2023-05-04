const Joi = require('joi');

exports.validateCourseCreate = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        courseCode: Joi.string().required(),
        universityId: Joi.string().required(),
        vacancy: Joi.string().required()
    })
};