'use strict';

const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const documentService = require('../services/document.service');
const { v4: uuidv4 } = require('uuid');

exports.getAllDocument = async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = {
        page,
        limit
    };
    try {
        const response = await documentService.findAllDocuments(queryParams);
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, response[0]);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getDocumentsByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const query = {
            userId: id
        }
        const response = await documentService.findOne(query);
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.removeDocument = async (req, res) => {
    const { eTag, userId } = req.query;
    const queryParameters = {
        eTag,
        userId
    }
    try {
        const response = await documentService.removeDocument(queryParameters);
        if (response && response.modifiedCount > 0) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.deleteFailed, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
}

exports.addDocument = async (req, res) => {
    const {
        name,
        userId
    } = req.body;
    const document = req.files;
    let documentMetadata = [];
    if (document && document.length > 0) {
        documentMetadata = document.map((data, i) => ({
            fieldName: data.fieldname,
            etag: uuidv4(),
            originalName: data.originalname,
            fileName: data.filename,
            mimeType: data.mimetype,
            size: data.size,
            imageUrl: "http://samplefile.com/sample.jpeg"
        }));
    }
    const id = uuidv4();
    const lastUpdatedOn = Date.now();
    try {
        //Do cloud upload and get docId
        const docExists = await documentService.exists({userId});
        if(!docExists) {
            const documentData = {
                id: id,
                name: name,
                userId: userId,
                cloudStorage: documentMetadata,
                lastUpdatedOn: lastUpdatedOn
            };
            const newDocument = await documentService.save(documentData);
            if (newDocument) {
                responseUtil.successResponse(res, MessageUtil.success, newDocument);
            } else {
                responseUtil.failResponse(res, MessageUtil.creationFailed, response);
            }
        } else {
            const documentData = await documentService.findOne({userId: userId});
            documentMetadata.map((data) => {
                documentData.cloudStorage.push(data);
            })
            const newDocument = await documentService.save(documentData);
            if (newDocument) {
                responseUtil.successResponse(res, MessageUtil.success, newDocument);
            } else {
                responseUtil.failResponse(res, MessageUtil.creationFailed, response);
            }
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};