'use strict';
const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const countryService = require("../services/country.service");
const { v4: uuidv4 } = require('uuid');

exports.getAllCountry = async (req, res) => {
    try {
        const response = await countryService.findAll();
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getCountryById = async (req, res) => {
    const countryId = req.params.id;
    try {
        if (!countryId) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await countryService.findOne({ id: countryId });
        if (response != null) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.createCountry = async (req, res) => {
    const {
        name,
        description,
        countryCode,
        isBlocked
    } = req.body;
    const lastUpdatedOn = Date.now();
    const id = uuidv4();
    try {
        const userData = {
            id: id,
            name: name,
            description: description,
            countryCode: countryCode,
            isBlocked: isBlocked,
            lastUpdatedOn: lastUpdatedOn
        };
        const newCountry = await countryService.save(userData);
        if (newCountry) {
            responseUtil.successResponse(res, MessageUtil.success, newCountry);
        } else {
            responseUtil.failResponse(res, MessageUtil.somethingWentWrong, newCountry);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.updateCountryById = async (req, res) => {
    const reqBody = req.body;
    reqBody.lastUpdatedOn = Date.now();
    const countryId = req.params.id;
    try {
        const response = await countryService.updateOne({ id: countryId }, reqBody);
        if (response) {
            const updatedCountry = await countryService.findOne({ id: countryId });
            responseUtil.successResponse(res, MessageUtil.success, updatedCountry);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.deleteCountryById = async (req, res) => {
    const countryId = req.params.id;
    try {
        if (!countryId) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await countryService.deleteOne({ id: countryId });
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, `Country Deleted Successfully`);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};