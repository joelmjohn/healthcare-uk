const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');

const user = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    userName: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    gender: {
        type: String,
        enum: modelEnum.GENDER_ENUM,
        required: true
    },
    dob: { type: Date, required: true },
    country: {
        type: String,
        enum: modelEnum.COUNTRY_LIST,
        required: true
    },
    education: [
        {
            degree: String,
            college: String,
            startDate: String,
            endDate: String,
            passYear: Number
        }
    ],

    experience: [
        {
            organisationName: String,
            startDate: String,
            endDate: String,
            designation: String,
        }
    ],
    awards: [{ awardName: String, year: Number }],
    profileImg: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    hasAddedBasicInfo: {
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

module.exports = new mongoose.model('user', user);