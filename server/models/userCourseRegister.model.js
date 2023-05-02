const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');

const userCourseRegister = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true

    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'course',
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

module.exports = new mongoose.model('userCourseRegister', userCourseRegister);