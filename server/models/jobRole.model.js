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
        type: Schema.Types.ObjectId,
        ref: 'country',
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    vacancy: {
        type: Number,
        default: 0,
        required: true
    },
    skillsRequired: [{
        skillName: String
    }],
    experience: {
        type: String,
        required: true
    },
    industryType: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastUpdatedOn: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

module.exports = new mongoose.model('jobRole', jobRole);