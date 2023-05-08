'use strict';
const { HTTP_STATUS_CODES } = require('../config');
const defaultErrorMessage = 'Invalid Request!';

exports.successResponse = (res, message, data, moreData) => {
    let response = {
        status: true,
        message: message
    };
    if (data || !data) response.data = data;
    if (moreData) response = { ...response, ...moreData };
    res.status(HTTP_STATUS_CODES.OK).send(response);
};

exports.errorResponse = (res, message, error) => {
    let response = {
        status: false,
        message: message
    };
    if (error) {
        response.error = error;
    }
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(response);
};

exports.throwError = (errorMessage = defaultErrorMessage) => {
    const err = { message: errorMessage };
    throw err;
};

exports.validationErrorResponse = (res, errors) => {
    const response = {
        type: 'internal',
        success: false,
        message: errors,
        errors: errors
    };
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json(response);
};

exports.failResponse = (res, message, data, moreData) => {
    let response = {
        status: false,
        message: message
    };
    if (data || !data) response.data = data;
    if (moreData) response = { ...response, ...moreData };
    res.status(HTTP_STATUS_CODES.NO_CONTENT).send(response);
};
