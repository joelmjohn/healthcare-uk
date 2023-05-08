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
        courseId,
        email,
    } = req.body;
    const id = uuidv4();
    try {
        const courseData = {
            id,
            candidateName,
            courseId,
            email,
            registrationStatus: "PENDING"
        };
        const userExists = await userServices.exists(email);
        if(userExists) {
            const isUserErolledToCourse = await userRegistrationService.isUserAlreadyEnrolledToCourse(email, courseId);
            if (isUserErolledToCourse) {
                responseUtil.throwError(MessageUtil.userAlreadyEnrolledToCourse)
            } else {
                const enrollUserToCourse = await userRegistrationService.enrollUserToCourse(courseData)
                if(enrollUserToCourse) {
                    const getUserDataToEmail = await userRegistrationService.mergeUserDataForEmail(email, courseId)
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
