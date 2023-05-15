'use strict';
const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const jobRegService = require("../services/userJobRegister.service");
const { v4: uuidv4 } = require('uuid');

exports.getAllJobRegistrations = async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = {
        page,
        limit
    };
    try {
        const response = await jobRegService.findAll(queryParams);
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, response[0]);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getJobRegistrationById = async (req, res, next) => {
    const jobRegId = req.params.id;
    try {
        if (!jobRegId) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await jobRegService.findOne({ id: jobRegId });
        if (response != null) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.createJobRegistration = async (req, res) => {
    const {
        name,
        userId,
        jobRoleId,
        registeredOn,
        registrationStatus,
    } = req.body;
    const id = uuidv4();
    try {
        const data = {
            id: id,
            name: name,
            userId: userId,
            jobRoleId: jobRoleId,
            registeredOn: registeredOn,
            registrationStatus: registrationStatus,
        };
        const newJobReg = await jobRegService.save(data);
        if (newJobReg) {
            responseUtil.successResponse(res, MessageUtil.success, newJobReg);
        } else {
            responseUtil.failResponse(res, MessageUtil.somethingWentWrong, newJobReg);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.updateJobRegById = async (req, res) => {
    const reqBody = req.body;
    const jobRegId = req.params.id;
    try {
        const response = await jobRegService.updateOne({ id: jobRegId }, reqBody);
        if (response) {
            const updatedReg = await jobRegService.findOne({ id: jobRegId });
            responseUtil.successResponse(res, MessageUtil.success, updatedReg);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.deleteJobRegById = async (req, res) => {
    const jobRegId = req.params.id;
    try {
        if (!jobRegId) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await jobRegService.deleteOne({ id: jobRegId });
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, `Job Registration Deleted Successfully`);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getJobRegByFilter = async (req, res) => {
    const filterData = req.body;
    try {
        if (!filterData) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await jobRegService.findAllByFilter(filterData);
        if (response.length) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

