const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');

const document = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true

    },
    cloudStorage: {
        type: Object,
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

module.exports = new mongoose.model('document', document);