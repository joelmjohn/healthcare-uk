'use strict';
const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const authServices = require('../services/authentication.service');
const { v4: uuidv4 } = require('uuid');

exports.login = async (req, res, next) => {
    try {
        if(req.body.email && req.body.password) {
            const response = await authServices.login(req.body);
            if(response) {
                responseUtil.successResponse(res, MessageUtil.success, response);
            } else {
                responseUtil.failResponse(res, MessageUtil.loginFailed);
            }
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};