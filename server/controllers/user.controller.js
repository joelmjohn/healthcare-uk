const express = require('express');
const router = express.Router();
const userModel = require("../models/user.model");


exports.getUser = async (req, res) => {
    //res.send(' Test Get All');
    try {
        const allUsers = await userModel.find();
        res.status(200).json({ status: true, message: allUsers })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
};

exports.createUser = async (req, res) => {
    const {
        userType,
        jobRole,
        email,
        userName,
        password,
        fullName,
        gender,
        dob,
        country,
        education,
        experience,
        awards,
        image,
        isVerified,
        isBlocked,
        hasAddedBasicInfo
    } = req.body;
    const lastUpdatedOn = Date.now();
    try {
        const user = new userModel({
            userType: userType,
            jobRole: jobRole,
            email: email,
            userName: userName,
            password: password,
            fullName: fullName,
            gender: gender,
            dob: dob,
            country: country,
            education,
            experience: experience,
            awards: awards,
            image: image,
            isVerified: isVerified,
            isBlocked: isBlocked,
            hasAddedBasicInfo: hasAddedBasicInfo,
            lastUpdatedOn: lastUpdatedOn

        });
        const newUser = await user.save();
        res.status(201).json({ status: true, message: newUser });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};