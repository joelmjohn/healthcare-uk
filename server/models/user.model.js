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
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
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
    awards: [{
        awardName: String,
        awardedBy: String,
        year: Number
    }],
    phone: {
        type: Number,
    },
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
    }
}, { timestamps: true });

module.exports = new mongoose.model('user', user);