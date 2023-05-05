'use strict';

const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const courseServices = require('../services/course.service');
const { v4: uuidv4 } = require('uuid');

exports.getAllCourses = async (req, res) => {
    try {
        const response = await courseServices.findAll();
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.throwError(MessageUtil.somethingWentWrong);
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
            responseUtil.throwError(MessageUtil.somethingWentWrong);
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
        universityCode,
        vacancy
    } = req.body;
    const id = uuidv4();
    const lastUpdatedOn = Date.now();
    try {
        const courseData = {
            id,
            name,
            description,
            courseCode,
            universityCode,
            vacancy,
            lastUpdatedOn
        };
        const courseExists = await courseServices.exists(courseCode);
        if(courseExists) {
            responseUtil.throwError(MessageUtil.somethingWentWrongInCourse);
        } else {
            const newCourse = await courseServices.save(courseData);
            if (newCourse) {
                responseUtil.successResponse(res, MessageUtil.success, newCourse);
            } else {
                responseUtil.throwError(MessageUtil.serverError);
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
        if(!courseExists){
            responseUtil.throwError(MessageUtil.somethingWentWrong);
        } else {
            const response = await courseServices.modifyCourse(id, req.body)
            console.log(response)
            if(response) {
                responseUtil.successResponse(res, MessageUtil.success, response);
            } else {
                responseUtil.throwError(MessageUtil.somethingWentWrong);
            }
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.removeCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const courseExists = await courseServices.exists(id);
        if(!courseExists){
            responseUtil.throwError(MessageUtil.somethingWentWrong);
        } else {
            const response = await courseServices.rmCourse(id)
            if(response) {
                responseUtil.successResponse(res, MessageUtil.success, response);
            } else {
                responseUtil.throwError(MessageUtil.somethingWentWrong);
            }
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
}