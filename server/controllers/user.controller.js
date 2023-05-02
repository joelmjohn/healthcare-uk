const express = require('express');
const router = express.Router();
const userModel = require("../models/user.model");
const md5 = require('md5');

exports.getUsers = async (req, res) => {
    try {
        const allUsers = await userModel.find();
        res.status(200).json({ status: true, message: allUsers })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
};

exports.getUserById = async (req, res, next) => {
    const userId = req.params.id;
    console.log('%cuser.controller.js line:17 userId', 'color: #007acc;', userId);
    try {
        if (userId == null) {
            throw "INVALID USER ID";
        }
        const user = await userModel.find({ id: userId });
        res.status(200).json({ status: true, message: user })
    } catch (err) {
        res.status(400).json({ status: false, message: err.message })
    }
    next();
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
    const id = new Date().toISOString().replace(/:/g, "") + firstName;
    try {
        const user = new userModel({
            id: id,
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

exports.updateUserById = async (req, res) => {
    const reqBody = req.body;
    const userId = req.params.id;
    try {
        const user = await userModel.findOneAndUpdate({ id: userId }, reqBody);
        res.status(200).json({ status: true, message: `User Updated Successfully` })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
};

exports.deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findOneAndDelete({ id: userId });
        res.status(200).json({ status: true, message: `User Deleted Successfully` })
    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
};