'use strict';
const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const jobService = require("../services/job.service");
const { v4: uuidv4 } = require('uuid');
const jobRegService = require("../services/userJobRegister.service");


exports.getJobs = async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = {
        page,
        limit
    };
    try {
        const response = await jobService.findAll(queryParams);
        if (response.jobs.length) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getJobById = async (req, res, next) => {
    const jobId = req.params.id;
    try {
        if (!jobId) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await jobService.findOne({ id: jobId });
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

exports.createJob = async (req, res) => {
    const {
        jobName,
        jobDescription,
        companyName,
        companyDescription,
        address,
        countryId,
        status,
        vacancy,
        skillsRequired,
        experienceRequired,
        industryType,
        employmentType,
        validTillDate,
        adminId,
        isBlocked
    } = req.body;
    const id = uuidv4();
    try {
        const data = {
            id: id,
            jobName: jobName,
            jobDescription: jobDescription,
            companyName: companyName,
            companyDescription: companyDescription,
            address: address,
            countryId: countryId,
            status: status,
            vacancy: vacancy,
            skillsRequired: skillsRequired,
            experienceRequired: experienceRequired,
            industryType: industryType,
            employmentType: employmentType,
            isBlocked: isBlocked,
            validTillDate: validTillDate,
            adminId: adminId
        };
        const newJob = await jobService.save(data);
        if (newJob) {
            responseUtil.successResponse(res, MessageUtil.success, newJob);
        } else {
            responseUtil.failResponse(res, MessageUtil.somethingWentWrong, newJob);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.updateJobById = async (req, res) => {
    const reqBody = req.body;
    const jobId = req.params.id;
    try {
        const response = await jobService.updateOne({ id: jobId }, reqBody);
        if (response) {
            const updatedJob = await jobService.findOne({ id: jobId });
            responseUtil.successResponse(res, MessageUtil.success, updatedJob);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

const checkJobRecords = async (jobId) => {
    const filter = { "jobRoleId": jobId };
    const services = [jobRegService];
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

exports.deleteJobById = async (req, res) => {
    const jobId = req.params.id;
    try {
        if (!jobId) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const verifyJob = await checkJobRecords(jobId);
        if (!verifyJob) {
            return responseUtil.failResponse(res, MessageUtil.entityExistInCollection, { statusCode: 403 });
        }
        else {
            const response = await jobService.deleteOne({ id: jobId });
            if (response) {
                responseUtil.successResponse(res, MessageUtil.success, `Job Deleted Successfully`);
            } else {
                responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
            }
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getAllJobsByFilter = async (req, res) => {
    const filterData = req.body;
    try {
        if (!filterData) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await jobService.findAllByFilter(filterData);
        if (response.length) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};
