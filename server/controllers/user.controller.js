const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const userService = require("../services/user.service");
const userModel = require("../models/user.model");
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');

exports.getUsers = async (req, res) => {
    try {
        const response = await userService.findAll();
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
    console.log('%cuser.controller.js line:17 userId', 'color: #007acc;', userId);
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
        userName,
        password,
        lastName,
        gender,
        dob,
        country,
        education,
        experience,
        awards,
        profileImg,
        isVerified,
        isBlocked,
        hasAddedBasicInfo
    } = req.body;
    const lastUpdatedOn = Date.now();
    const passwordEncrypted = md5(password);
    const id = uuidv4();
    try {
        const userData = new userModel({
            id: id,
            firstName: firstName,
            designation: designation,
            email: email,
            userName: userName,
            password: passwordEncrypted,
            lastName: lastName,
            gender: gender,
            dob: dob,
            country: country,
            education,
            experience: experience,
            awards: awards,
            profileImg: profileImg,
            isVerified: isVerified,
            isBlocked: isBlocked,
            hasAddedBasicInfo: hasAddedBasicInfo,
            lastUpdatedOn: lastUpdatedOn

        });
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