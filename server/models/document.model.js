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
    cloudStorage: [{
        fieldName: {
            type: String,
            required: true
        },
        etag: {
            type: String,
            required: true
        },
        originalName: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        mimeType: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    }],
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


document.index({
    userId: 1
})

module.exports = new mongoose.model('document', document);