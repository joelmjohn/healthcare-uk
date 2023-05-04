const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');

const userJobRegister = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: false

    },
    jobRoleId: {
        type: String,
        required: false

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

module.exports = new mongoose.model('userJobRegister', userJobRegister);