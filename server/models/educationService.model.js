const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');

const educationService = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    serviceInstitutions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'institution',
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

module.exports = new mongoose.model('educationService', educationService);