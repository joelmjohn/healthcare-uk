const express = require('express');
const router = express.Router();
const organisationModel = require("../models/organisation.model");


exports.getOrganisation = async (req, res) => {
    try {
        const allOrganisation = await organisationModel.find();
        res.status(200).json({ status: true, message: allOrganisation })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

exports.createOrganisation = async (req, res) => {
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
        const organisation = new organisationModel({
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
        const newOrganisation = await organisation.save();
        res.status(201).json({ status: true, message: newOrganisation });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};