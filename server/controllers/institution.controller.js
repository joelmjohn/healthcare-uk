const express = require('express');
const router = express.Router();
const institutionModel = require("../models/institution.model");


exports.getInstitution = async (req, res) => {
    try {
        const allInstitutions = await institutionModel.find();
        res.status(200).json({ status: true, message: allInstitutions })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

exports.createInstitution = async (req, res) => {
    const {
        name,
        description,
        address,
        city,
        state,
        headCount,
        rating,
        isBlocked,
        country

    } = req.body;

    const lastUpdatedOn = Date.now();
    try {
        const institution = new institutionModel({
            name: name,
            description: description,
            address: address,
            city: city,
            state: state,
            headCount: headCount,
            rating: rating,
            isBlocked: isBlocked,
            country: country,
            lastUpdatedOn: lastUpdatedOn
        });
        const newInstitution = await institution.save();
        res.status(201).json({ status: true, message: newInstitution });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};