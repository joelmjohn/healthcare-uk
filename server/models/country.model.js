const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');

const country = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    countryCode: {
        type: String,
        required: true

    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = new mongoose.model('country', country);