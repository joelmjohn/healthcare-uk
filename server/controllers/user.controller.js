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
        email,
        password,
        role,
        userName,
        fullName,
    } = req.body;

    try {
        if (!email || !password || !role || !userName || !fullName) {
            throw new Error("BAD_REQUEST");
        }
        const user = new userModel({
            role: role,
            email: email,
            fullName: fullName,
            userName: userName,
            password: password
        });
        const newUser = await user.save();
        res.status(201).json({ status: true, message: newUser });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};