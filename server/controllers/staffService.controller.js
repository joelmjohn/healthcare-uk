const express = require('express');
const router = express.Router();
const staffServiceModel = require("../models/staffService.model");


exports.getStaffService = async (req, res) => {
    try {
        const allStaffService = await staffServiceModel.find();
        res.status(200).json({ status: true, message: allStaffService })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

exports.createStaffService = async (req, res) => {
    const {
        name,
        description,
        serviceOrganization,
        isBlocked
    } = req.body;

    const lastUpdatedOn = Date.now();
    try {
        const staffService = new staffServiceModel({
            name: name,
            description: description,
            serviceOrganization: serviceOrganization,
            isBlocked: isBlocked,
            lastUpdatedOn: lastUpdatedOn
        });
        const newStaffService = await staffService.save();
        res.status(201).json({ status: true, message: newStaffService });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};