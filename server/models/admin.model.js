const bcrypt = require('bcrypt');
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
    role: {
        type: String,
        enum: modelEnum.ADMIN_ROLE,
        required: true
    },
    userName: {
        type: String,
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

// Password Hash middleware
admin.pre('save', function save (next) {
    const admin = this
    if (!admin.isModified('password')) {
      return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(admin.password, salt, null, (err, hash) => {
        if (err) {
          return next(err)
        }
        admin.password = hash
        next()
      })
    })
})


admin.pre('findOneAndUpdate', function save (next) {
    const admin = this
    const password = this.getUpdate().$set.password
    if (!password) {
      return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
  
      bcrypt.hash(password, salt, null, (err, hash) => {
        if (err) {
          return next(err)
        }
        admin.getUpdate().$set.password = hash
        next()
      })
    })
})


// Helper for comparing password
admin.methods.comparePassword = function comparePassword(adminPassword,cb) {
    bcrypt.compare(adminPassword, this.password, (err, isMatch) => {
       cb(err, isMatch)
    })
}

admin.options.toJSON = {
    transform (doc, ret, options) {
      delete ret._id
      delete ret.password
      delete ret.__v
      delete ret.createdAt
      delete ret.updatedAt
      return ret
    }
}
  
module.exports = new mongoose.model('admin', admin);