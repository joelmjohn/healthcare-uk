'use strict';

const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const userCourseRegistrationService = require('../services/userCourseRegistration.service');
const userServices = require('../services/user.service')
const { sendCourseRegistrationMail } = require('../utils/emailUtils');
const { v4: uuidv4 } = require('uuid');

exports.registerUserToCourse = async (req, res) => {
    const {
        courseId,
        email,
        userId
    } = req.body;
    // The below line will create a 10 digit unique id, the chances of collition is very less
    const id = uuidv4().replace(/-/g, '').substring(0, 10);
    try {
        const courseData = {
            id,
            name: `Course-Registration: ${id}`,
            courseId,
            email,
            userId,
            registrationStatus: "PENDING"
        };
        const userExists = await userServices.exists(email);
        if(userExists) {
            const isUserErolledToCourse = await userCourseRegistrationService.isUserAlreadyEnrolledToCourse(email, courseId);
            if (isUserErolledToCourse) {
                responseUtil.throwError(MessageUtil.userAlreadyEnrolledToCourse)
            } else {
                const enrollUserToCourse = await userCourseRegistrationService.enrollUserToCourse(courseData)
                if(enrollUserToCourse) {
                    const getUserDataToEmail = await userCourseRegistrationService.mergeUserDataForEmail(email, courseId)
                    if(getUserDataToEmail) {
                        const emailTemplateInformation = {}
                        emailTemplateInformation["user"] = getUserDataToEmail[0];
                        const sendEmail = await sendCourseRegistrationMail(emailTemplateInformation);
                        if(sendEmail) {
                            console.log(sendEmail)
                            responseUtil.successResponse(res, MessageUtil.success, sendEmail);
                        } else {
                            responseUtil.throwError(MessageUtil.emailTransportFailure)
                        }
                    } else {
                        responseUtil.throwError(MessageUtil.errorMergingDocuments)
                    }
                } else {
                    responseUtil.throwError(MessageUtil.userEnrollFailed);
                }
            }
        } else {
            responseUtil.throwError(MessageUtil.userEnrollFailed);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getCourseRegistrations = async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = {
        page,
        limit
    };
    try {
        const response = await userCourseRegistrationService.getAllRegistrations(queryParams);
        if(response) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.throwError(MessageUtil.serverError);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
}