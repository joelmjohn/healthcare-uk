const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');

const admin = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    richTextBody: {
        type: String,
        required: true

    },
    adminId: {
        type: String,
        required: true
    },
    comments: [
        {
            author: String,
            comment: String,
            date: Date
        }
    ],
    isBlocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = new mongoose.model('admin', admin);