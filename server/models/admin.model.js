const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelEnum = require('../constants/enum');
const { hashPassword, comparePassword } = require('../middleware/admin');

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
    role: {
        type: String,
        enum: modelEnum.ADMIN_ROLE,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    profileImg: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Password Hash Middleware
admin.pre('save', hashPassword);

// Helper for comparing password
admin.methods.comparePassword = comparePassword;

admin.options.toJSON = {
    transform(doc, ret, options) {
        delete ret._id
        delete ret.password
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
        return ret
    }
}

module.exports = new mongoose.model('admin', admin);