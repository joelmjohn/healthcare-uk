const express = require('express');
const router = express.Router();
const educationServiceModel = require("../models/educationService.model");


exports.getEducationService = async (req, res) => {
    try {
        const allEducationServices = await educationServiceModel.find();
        res.status(200).json({ status: true, message: allEducationServices })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

exports.createEducationService = async (req, res) => {
    const {
        name,
        description,
        serviceInstitutions,
        isBlocked
    } = req.body;

    const lastUpdatedOn = Date.now();
    try {
        const educationService = new educationServiceModel({
            name: name,
            description: description,
            serviceInstitutions: serviceInstitutions,
            isBlocked: isBlocked,
            lastUpdatedOn: lastUpdatedOn
        });
        const newEducationService = await educationService.save();
        res.status(201).json({ status: true, message: newEducationService });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};