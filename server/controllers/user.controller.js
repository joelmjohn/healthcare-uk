'use strict';
const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const userService = require("../services/user.service");
const { v4: uuidv4 } = require('uuid');

exports.getUsers = async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = {
        page,
        limit
    };
    try {
        const response = await userService.findAll(queryParams);
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getUserById = async (req, res, next) => {
    const userId = req.params.id;
    try {
        if (!userId) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await userService.findOne({ id: userId });
        if (response != null) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
    next()
};

exports.createUser = async (req, res) => {
    const {
        firstName,
        designation,
        email,
        lastName,
        gender,
        dob,
        country,
        address,
        zipCode,
        education,
        experience,
        awards,
        phone,
        profileImg,
        isVerified,
        isBlocked,
        hasAddedBasicInfo
    } = req.body;
    const id = uuidv4();
    try {
        const userData = {
            id: id,
            firstName: firstName,
            designation: designation,
            email: email,
            lastName: lastName,
            gender: gender,
            dob: dob,
            country: country,
            address: address,
            phone: phone,
            zipCode: zipCode,
            education: education,
            experience: experience,
            awards: awards,
            profileImg: profileImg,
            isVerified: isVerified,
            isBlocked: isBlocked,
            hasAddedBasicInfo: hasAddedBasicInfo

        };
        const newUser = await userService.save(userData);
        if (newUser) {
            responseUtil.successResponse(res, MessageUtil.success, newUser);
        } else {
            responseUtil.failResponse(res, MessageUtil.somethingWentWrong, newUser);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.updateUserById = async (req, res) => {
    const reqBody = req.body;
    const userId = req.params.id;
    try {
        const response = await userService.updateOne({ id: userId }, reqBody);
        if (response) {
            const updatedUser = await userService.findOne({ id: userId });
            responseUtil.successResponse(res, MessageUtil.success, updatedUser);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        if (!userId) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await userService.deleteOne({ id: userId });
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, `User Deleted Successfully`);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getUserByFilter = async (req, res) => {
    const filterData = req.body;
    try {
        if (!filterData) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await userService.findAllByFilter(filterData);
        if (response.length) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};
