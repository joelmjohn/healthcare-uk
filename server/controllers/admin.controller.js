'use strict';
const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const adminService = require("../services/admin.service");
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');

exports.getAllAdmin = async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = {
        page,
        limit
    };
    try {
        const response = await adminService.findAll(queryParams);
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getAdminById = async (req, res) => {
    const adminId = req.params.id;
    try {
        if (!adminId) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await adminService.findOne({ id: adminId });
        if (response != null) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.createAdmin = async (req, res) => {
    const {
        name,
        role,
        userName,
        password,
        email
    } = req.body;
    const id = uuidv4();
    try {
        const query = {
            email: email,
        }
        const doesAdminExists = await adminService.exists(query);
        if (doesAdminExists) {
            responseUtil.errorResponse(res, MessageUtil.alreadyExists);
        } else {
            const data = {
                id: id,
                name: name,
                role: role,
                userName: userName,
                password: password,
                email: email
            };
            const newAdmin = await adminService.save(data)
            if (newAdmin) {
                responseUtil.successResponse(res, MessageUtil.success, newAdmin);
            } else {
                responseUtil.failResponse(res, MessageUtil.somethingWentWrong, newAdmin);
            }
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.updateAdminById = async (req, res) => {
    const reqBody = req.body;
    const adminId = req.params.id;
    try {
        const response = await adminService.updateOne({ id: adminId }, reqBody);
        if (response) {
            const updatedAdmin = await adminService.findOne({ id: adminId });
            responseUtil.successResponse(res, MessageUtil.success, updatedAdmin);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.deleteAdminById = async (req, res) => {
    const adminId = req.params.id;
    try {
        if (!adminId) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await adminService.deleteOne({ id: adminId });
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, `Admin Deleted Successfully`);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getAdminByFilter = async (req, res) => {
    const filterData = req.body;
    try {
        if (!filterData) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await adminService.findAllByFilter(filterData);
        if (response.length) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.loginAdmin = async (req, res) => {
    const {
        email,
        password,
    } = req.body;
    const passwordEncrypted = md5(password);
    try {
        if (!email || !password) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const filter = { email: email, password: passwordEncrypted, isBlocked: false };
        const response = await adminService.findOneByFilter(filter);
        if (response != null) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};