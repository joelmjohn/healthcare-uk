'use strict';

const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const userRegistrationService = require('../services/registration.service');
const userServices = require('../services/user.service')
const { sendCourseRegistrationMail } = require('../utils/emailUtils');
const { v4: uuidv4 } = require('uuid');

exports.registerUserToCourse = async (req, res) => {
    const {
        candidateName,
        courseCode,
        userId,
    } = req.body;
    const id = uuidv4();
    try {
        const courseData = {
            id,
            candidateName,
            courseCode,
            userId,
            registrationStatus: "PENDING"
        };
        const userExists = await userServices.exists(userId);
        if(userExists) {
            const isUserErolledToCourse = await userRegistrationService.isUserAlreadyErolledToCourse(userId, courseCode);
            if (isUserErolledToCourse) {
                responseUtil.throwError(MessageUtil.userAlreadyEnrolledToCourse)
            } else {
                const enrollUserToCourse = await userRegistrationService.enrollUserToCourse(courseData)
                if(enrollUserToCourse) {
                    const getUserDataToEmail = await userRegistrationService.mergeUserDataForEmail(userId, courseCode)
                    console.log(getUserDataToEmail)
                    if(getUserDataToEmail) {
                        const emailTemplateInformation = {}
                        emailTemplateInformation["user"] = getUserDataToEmail[0];
                        const sendEmail = await sendCourseRegistrationMail(emailTemplateInformation)
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
