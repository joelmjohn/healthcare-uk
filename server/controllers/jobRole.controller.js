const express = require('express');
const router = express.Router();
const jobRoleModel = require("../models/jobRole.model");


exports.getJobRoles = async (req, res) => {
    try {
        const allJobRoles = await jobRoleModel.find();
        res.status(200).json({ status: true, message: allJobRoles })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
};

exports.createJobRole = async (req, res) => {
    const {
        name,
        description,
        isBlocked
    } = req.body;

    const lastUpdatedOn = Date.now();
    try {
        const jobRole = new jobRoleModel({
            name: name,
            description: description,
            isBlocked: isBlocked,
            lastUpdatedOn: lastUpdatedOn
        });
        const newJobRole = await jobRole.save();
        res.status(201).json({ status: true, message: newJobRole });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};