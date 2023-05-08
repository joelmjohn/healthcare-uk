const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');

const course = new Schema({
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
    courseCode: {
        type: String,
        required: true
    },
    universityId: {
        type: String,
        required: true
    },
    vacancy: {
        type: Number,
        default: 0,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = new mongoose.model('course', course);