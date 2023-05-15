'use strict';
const responseUtil = require('../utils/responseUtils');
const MessageUtil = require('../utils/messageUtil');
const blogpostService = require("../services/blogpost.service");
const { v4: uuidv4 } = require('uuid');

exports.getAllBlogpost = async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = {
        page,
        limit
    };
    try {
        const response = await blogpostService.findAll(queryParams);
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getBlogpostById = async (req, res, next) => {
    const blogId = req.params.id;
    try {
        if (!blogId) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await blogpostService.findOne({ id: blogId });
        if (response != null) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.createBlogpost = async (req, res) => {
    const {
        name,
        richTextBody,
        adminId,
        comments,
        isBlocked
    } = req.body;
    const id = uuidv4();
    try {
        const data = {
            id: id,
            name: name,
            richTextBody: richTextBody,
            adminId: adminId,
            comments: comments,
            isBlocked: isBlocked
        };
        const newBlog = await blogpostService.save(data);
        if (newBlog) {
            responseUtil.successResponse(res, MessageUtil.success, newBlog);
        } else {
            responseUtil.failResponse(res, MessageUtil.somethingWentWrong, newBlog);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.updateBlogById = async (req, res) => {
    const reqBody = req.body;
    const blogId = req.params.id;
    try {
        const response = await blogpostService.updateOne({ id: blogId }, reqBody);
        if (response) {
            const updatedBlog = await blogpostService.findOne({ id: blogId });
            responseUtil.successResponse(res, MessageUtil.success, updatedBlog);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.deleteBlogById = async (req, res) => {
    const blogId = req.params.id;
    try {
        if (!blogId) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await blogpostService.deleteOne({ id: blogId });
        if (response) {
            responseUtil.successResponse(res, MessageUtil.success, `Blogpost Deleted Successfully`);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }
    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

exports.getAllBlogsByFilter = async (req, res) => {
    const filterData = req.body;
    try {
        if (!filterData) {
            responseUtil.throwError(MessageUtil.invalidRequest);
        }
        const response = await blogpostService.findAllByFilter(filterData);
        if (response.length) {
            responseUtil.successResponse(res, MessageUtil.success, response);
        } else {
            responseUtil.failResponse(res, MessageUtil.requestedDataNotFound, response);
        }

    } catch (err) {
        responseUtil.errorResponse(res, err.message);
    }
};

