const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');

const userCourseRegister = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    candidateName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    registeredOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    registrationStatus: {
        type: String,
        enum: modelEnum.REG_STATUS
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = new mongoose.model('userCourseRegister', userCourseRegister);