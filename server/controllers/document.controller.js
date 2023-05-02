'use strict';

const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const documentService = require('../services/document.service');
const { v4: uuidv4 } = require('uuid');

exports.getAllDocument = async (req, res) => {
    try {
        const response = await documentService.findAll();
        if (response) {
            responseUtil.successResponse(res, MessageUtil.succuss, response);
        } else {
            responseUtil.throwError(MessageUtil.somethingWentWrong);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getDocument = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await documentService.findOne(id);
        if (response) {
            responseUtil.successResponse(res, MessageUtil.succuss, response);
        } else {
            responseUtil.throwError(MessageUtil.somethingWentWrong);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.createDocument = async (req, res) => {
    const {
        name,
        userId
    } = req.body;
    // const { document = [] } = req.files;
    // console.log(document);
    const id = uuidv4();
    const lastUpdatedOn = Date.now();
    try {
        //Do cloud upload and get docId
        let docId = {
            name: 'document',
            cloudId: 'sampleXYZ'
        };
        const documentData = {
            id: id,
            name: name,
            userId: userId.toString(),
            cloudStorage: docId,
            lastUpdatedOn: lastUpdatedOn
        };
        const newDocument = await documentService.save(documentData);
        if (newDocument) {
            responseUtil.successResponse(res, MessageUtil.succuss, newDocument);
        } else {
            responseUtil.throwError(MessageUtil.serverError);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};