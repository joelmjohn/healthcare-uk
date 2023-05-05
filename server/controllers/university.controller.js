'use strict';

const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const universityServices = require('../services/university.service');
const { v4: uuidv4 } = require('uuid');

exports.getAllUniversities = async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = {
        page,
        limit
    };
    try {
        const response = await universityServices.findAllUniversities(queryParams);
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.throwError(MessageUtil.somethingWentWrong);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.updateUniversity = async (req, res) => {
    try {
        const { id } = req.params;
        const universityExists = await universityServices.exists(id);
        if(!universityExists){
            responseUtil.throwError(MessageUtil.somethingWentWrong);
        } else {
            console.log(req.body)
            const response = await universityServices.modifyUniversity(id, req.body)
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
}

exports.removeUniversity = async (req, res) => {
    try {
        const { id } = req.params;
        const universityExists = await universityServices.exists(id);
        if(!universityExists){
            responseUtil.throwError(MessageUtil.somethingWentWrong);
        } else {
            const response = await universityServices.rmUniversity(id)
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

exports.getUniversityById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = {
            id: id,
        }
        const response = await universityServices.findOne(query);
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.throwError(MessageUtil.somethingWentWrong);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.addUniversity = async (req, res) => {
    const {
        name,
        description,
        universityCode,
        address,
        countryCode
    } = req.body;
    const id = uuidv4();
    const lastUpdatedOn = Date.now();
    try {
        const universityData = {
            id,
            name,
            description,
            universityCode,
            address,
            countryCode,
            lastUpdatedOn
        };
        const universityExists = await universityServices.exists(universityCode)
        if(universityExists) {
            responseUtil.throwError(MessageUtil.somethingWentWrongInUniversity);
        } else {
            const newUniversity = await universityServices.save(universityData);
            console.log(newUniversity)
            if (newUniversity) {
                responseUtil.successResponse(res, MessageUtil.success, newUniversity);
            } else {
                responseUtil.throwError(MessageUtil.serverError);
            }
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

// exports.removeUniversity = async (req, res) => {
//     const id = req.params.id;
//     const lastUpdatedOn = Date.now();
//     try {
//         const isValidUniversity = await universityServices.findOne({id: id});
//         if(isValidUniversity) {
//             await universityServices.deleteOne({id: id});
//             responseUtil.successResponse(res, MessageUtil.success, isValidUniversity);
//         } else {
//             responseUtil.throwError(MessageUtil.serverError);
//         }
//     } catch (err) {
//         responseUtil.errorResponse(res, err.message);
//     }
// };