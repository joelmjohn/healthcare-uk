'use strict';

const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const courseServices = require('../services/course.service');
const { v4: uuidv4 } = require('uuid');
const courseRegService = require("../services/userCourseRegistration.service")


exports.getAllCourses = async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = {
        page,
        limit
    };
    try {
        const response = await courseServices.findAllCourses(queryParams);
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = {
            id: id,
        }
        const response = await courseServices.findOne(query);
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.addCourse = async (req, res) => {
    const {
        name,
        description,
        courseCode,
        universityId,
        vacancy,
        adminId
    } = req.body;
    const id = uuidv4();
    try {
        const courseData = {
            id,
            name,
            description,
            courseCode,
            universityId,
            vacancy,
            adminId
        };
        const courseExists = await courseServices.exists(courseCode);
        if (courseExists) {
            responseUtil.failResponse(res, MessageUtil.alreadyExists, courseExists);
        } else {
            const newCourse = await courseServices.save(courseData);
            if (newCourse) {
                responseUtil.successResponse(res, MessageUtil.success, newCourse);
            } else {
                responseUtil.failResponse(res, MessageUtil.creationFailed, newCourse);
            }
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const courseExists = await courseServices.exists(id);
        if (!courseExists) {
            responseUtil.throwError(MessageUtil.somethingWentWrong);
        } else {
            const response = await courseServices.modifyCourse(id, req.body)
            console.log(response)
            if (response) {
                responseUtil.successResponse(res, MessageUtil.success, response);
            } else {
                responseUtil.failResponse(res, MessageUtil.updationFailed);
            }
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

const checkCourseRecords = async (courseId) => {
    const filter = { "courseId": courseId };
    const services = [courseRegService];
    let authorizeDelete = true;
    for (const service of services) {
        let response = await service.findOne(filter);
        if (response !== null) {
            authorizeDelete = false;
            break;
        }
    };
    return authorizeDelete;
}

exports.removeCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const courseExists = await courseServices.exists(id);
        if (!courseExists) {
            return responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, { statusCode: 404 });
        }
        const verifyCourse = await checkCourseRecords(id);
        if (!verifyCourse) {
            return responseUtil.failResponse(res, MessageUtil.entityExistInCollection, { statusCode: 403 });
        }
        else {
            const response = await courseServices.rmCourse(id)
            if (response) {
                responseUtil.successResponse(res, MessageUtil.success, response);
            } else {
                responseUtil.failResponse(res, MessageUtil.deleteFailed);
            }
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
}