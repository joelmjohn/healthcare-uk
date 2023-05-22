'use strict';
const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const adminService = require("../services/admin.service");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const blogpostService = require("../services/blogpost.service");
const countryService = require("../services/country.service");
const courseService = require("../services/course.service");
const universityService = require("../services/university.service");


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
    try {
        if (!email || !password) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const adminDetails = await adminService.findOneByFilter({ email: email, isVerified: true, isBlocked: false });
        if (adminDetails == null) {
            return responseUtil.failResponse(res, MessageUtil.requestedDataNotFound);
        }
        const verifyPassword = await bcrypt.compare(password, adminDetails.password);
        if (verifyPassword) {
            responseUtil.successResponse(res, MessageUtil.success, adminDetails);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

const checkAdminRecords = async (adminId) => {
    const filter = { adminId: adminId };
    const services = [blogpostService, countryService, courseService, universityService];
    try {
        services.forEach(async (service, idx) => {
            let response = await service.findOne(filter);
            if (response) {
                throw "ERROR";
            }
        });
    } catch (error) {
        throw error;
    }
    // const country = await countryService.findOne(filter);
    // if (country) {
    //     return false;
    // }
    // const course = await courseService.findOne(filter);
    // if (course) {
    //     return false;
    // }
    // const university = await courseService.findOne(filter);
    // if (course) {
    //     return false;
    // }
}
