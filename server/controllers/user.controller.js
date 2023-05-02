const express = require('express');
const router = express.Router();
const userModel = require("../models/user.model");
const md5 = require('md5');

exports.getUser = async (req, res) => {
    try {
        const allUsers = await userModel.find();
        res.status(200).json({ status: true, message: allUsers })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
};

exports.createUser = async (req, res) => {
    const {
        firstName,
        designation,
        email,
        userName,
        password,
        lastName,
        gender,
        dob,
        country,
        education,
        experience,
        awards,
        profileImg,
        isVerified,
        isBlocked,
        hasAddedBasicInfo
    } = req.body;
    const lastUpdatedOn = Date.now();
    const passwordEncrypted = md5(password);
    try {
        const user = new userModel({
            firstName: firstName,
            designation: designation,
            email: email,
            userName: userName,
            password: passwordEncrypted,
            lastName: lastName,
            gender: gender,
            dob: dob,
            country: country,
            education,
            experience: experience,
            awards: awards,
            profileImg: profileImg,
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