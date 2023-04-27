const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');

const staffService = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    serviceOrganization: [
        {
            type: Schema.Types.ObjectId,
            ref: 'organisation',
            required: true
        }
    ],
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

module.exports = new mongoose.model('staffService', staffService);