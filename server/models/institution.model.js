const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');

const institution = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: { type: String },
    state: { type: String },
    country: {
        type: String,
        enum: modelEnum.COUNTRY_LIST,
        required: true
    },
    headCount: {
        type: Number,
    },
    rating: {
        type: Number,
        enum: modelEnum.ORG_RATING
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

module.exports = new mongoose.model('institution', institution);