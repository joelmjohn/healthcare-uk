const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');

const jobRole = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    jobName: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyDescription: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    countryId: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: modelEnum.JOB_STATUS,
        default: "ACTIVE"
    },
    vacancy: {
        type: Number,
        default: 0,
        required: true
    },
    skillsRequired: [],
    experienceRequired: {
        type: String,
        required: true
    },
    industryType: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        enum: modelEnum.EMPLMNT_TYPE,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    validTillDate: {
        type: Date,
        required: true,
    },
    adminId: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = new mongoose.model('jobRole', jobRole);